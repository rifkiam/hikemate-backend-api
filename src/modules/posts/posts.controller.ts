import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Patch,
    Post,
    Query,
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
    async getAllPosts() {
        const response = await this.postsService.getAllPosts();
        return response;
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @Roles('USER')
    @HttpCode(200)
    @ResponseMessage('Posts successfully fetched!')
    async getPostById(@Query('id') id: string) {
        const response = await this.postsService.getPostById(id);
        return response;
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
        @Query('id') postId: string,
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
    async deletePost(@Token('id') id: string, @Query('id') postId: string) {
        const emp = await this.postsService.deletePost(id, postId);
        return emp;
    }
}
