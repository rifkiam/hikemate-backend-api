import { Injectable } from '@nestjs/common';

import { saveFile } from '@/common/helpers/multer.helper';
import { CustomException } from '@/common/response/CustomException';
import { PrismaService } from '@/providers/prisma';

import { PostDto } from './dtos/post.dto';

@Injectable()
export class PostsService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllPosts() {
        const posts = await this.prismaService.posts.findMany({
            orderBy: { created_at: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image_path: true,
                    },
                },
                User_likes_posts: {
                    select: {
                        user_id: true,
                    },
                },
                _count: {
                    select: {
                        User_likes_posts: true,
                    },
                },
            },
        });

        return posts;
    }

    async getPostById(id: string) {
        const post = await this.prismaService.posts.findFirst({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image_path: true,
                    },
                },
                User_likes_posts: {
                    select: {
                        user_id: true,
                    },
                },
                _count: {
                    select: {
                        User_likes_posts: true,
                    },
                },
            },
        });
        return post;
    }

    async insertPost(
        userId: string,
        postDto: PostDto,
        file: Express.Multer.File,
    ) {
        const filePath = saveFile('user/posts/', file, 'postImg');

        const post = await this.prismaService.posts.create({
            data: {
                title: postDto.title,
                content: postDto.content,
                place: postDto.place,
                user_id: userId,
                file_path: filePath,
            },
        });

        return post;
    }

    async updatePost(
        userId: string,
        postId: string,
        postDto: PostDto,
        // file: Express.Multer.File
    ) {
        const user = await this.prismaService.users.findFirst({
            where: { id: userId },
            select: { id: true },
        });

        const oldPost = await this.prismaService.posts.findFirst({
            where: { id: postId },
        });

        if (user.id !== oldPost.user_id) {
            throw new CustomException('User does not own this post', 403);
        }

        // deleteFile(oldPost.file_path);

        // const filePath = saveFile('user/posts/', file, 'postImg');

        const post = await this.prismaService.posts.update({
            where: { id: postId },
            data: {
                title: postDto.title ? postDto.title : oldPost.title,
                content: postDto.content ? postDto.content : oldPost.content,
                place: postDto.place ? postDto.place : oldPost.place,
                // user_id: userId,
                // file_path: filePath,
            },
        });

        return post;
    }

    async deletePost(userId: string, postId: string) {
        const user = await this.prismaService.users.findFirst({
            where: { id: userId },
            select: { id: true },
        });

        const oldPost = await this.prismaService.posts.findFirst({
            where: { id: postId },
        });

        if (user.id !== oldPost.user_id) {
            throw new CustomException('User does not own this post', 403);
        }

        await this.prismaService.posts.delete({
            where: { id: postId },
        });

        return {};
    }

    async likePost(userId: string, postId: string) {
        const count = await this.prismaService.user_likes_posts.count();

        const existing = await this.prismaService.user_likes_posts.findFirst({
            where: {
                user_id: userId,
                post_id: postId,
            },
        });

        if (!existing) {
            await this.prismaService.user_likes_posts.create({
                data: {
                    id: count + 1,
                    post_id: postId,
                    user_id: userId,
                },
            });
        } else {
            await this.prismaService.user_likes_posts.delete({
                where: {
                    id: existing.id,
                },
            });
        }
    }
}
