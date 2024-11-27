import { BadRequestException, Injectable } from '@nestjs/common';

import saveFile from '@/common/helpers/multer.helper';
import { PrismaService } from '@/providers/prisma';

import { PostDto } from './dtos/post.dto';

@Injectable()
export class PostsService {
    constructor(private readonly prismaService: PrismaService) {}

    async insertPost(
        userId: string,
        postDto: PostDto,
        file: Express.Multer.File,
    ) {
        const user = this.prismaService.users.findFirst({
            where: { id: userId },
        });

        if (!user) {
            throw new BadRequestException({ message: 'User not found!' });
        }

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
}
