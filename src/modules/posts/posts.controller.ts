import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ResponseMessage } from '@/common/decorators/responseMessage.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { Token } from '@/common/decorators/token.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt';
import { RoleGuard } from '@/common/guards/roles/role.guard';
import { PostBody } from '@/common/request/apiBody.posts';

import { PatchDto, PostDto } from './dtos/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @Roles('USER')
    @HttpCode(200)
    @ResponseMessage('Posts successfully fetched!')
    async getAllPosts(@Token('id') userId: string) {
        const response = await this.postsService.getAllPosts();

        const parsedResponse = response.map((item) => {
            return {
                id: item.id,
                title: item.title,
                content: item.content,
                place: item.place,
                file_path: item.file_path,
                likes: item._count.User_likes_posts,
                liked: item.User_likes_posts.find((id) => id.user_id === userId)
                    ? true
                    : false,
                created_at: item.created_at,
                updated_at: item.updated_at,
                user_id: item.user_id,
                user_name: item.user.name,
                user_profile: item.user.image_path,
            };
        });

        return parsedResponse;
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @Roles('USER')
    @HttpCode(200)
    @ResponseMessage('Posts successfully fetched!')
    async getPostById(@Token('id') userId: string, @Param('id') id: string) {
        const response = await this.postsService.getPostById(id);

        const parsedResponse = {
            id: response.id,
            title: response.title,
            content: response.content,
            place: response.place,
            file_path: response.file_path,
            likes: response._count.User_likes_posts,
            liked: response.User_likes_posts.find((id) => id.user_id === userId)
                ? true
                : false,
            created_at: response.created_at,
            updated_at: response.updated_at,
            user_id: response.user_id,
            user_name: response.user.name,
            user_profile: response.user.image_path,
        };

        return parsedResponse;
    }

    @Post('')
    @ApiConsumes('multipart/form-data')
    @ApiBody(PostBody)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @Roles('USER')
    @HttpCode(201)
    @UseInterceptors(FileInterceptor('file'))
    @ResponseMessage('Successfully added post')
    async insertPost(
        @Token('id') id: string,
        @Body() postDto: PostDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const response = await this.postsService.insertPost(id, postDto, file);
        return response;
    }

    @Patch('/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @Roles('USER')
    @HttpCode(201)
    @ResponseMessage('Post updated successfully')
    async updatePost(
        @Token('id') id: string,
        @Param('id') postId: string,
        @Body() postDto: PatchDto,
    ) {
        const response = await this.postsService.updatePost(
            id,
            postId,
            postDto,
        );
        return response;
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @Roles('USER')
    @HttpCode(200)
    @ResponseMessage('Post deleted successfully')
    async deletePost(@Token('id') id: string, @Param('id') postId: string) {
        const emp = await this.postsService.deletePost(id, postId);
        return emp;
    }

    @Patch('/like/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @Roles('USER')
    @HttpCode(201)
    async likePost(@Token('id') userId: string, @Param('id') postId: string) {
        await this.postsService.likePost(userId, postId);
        return;
    }
}
