import {
    Body,
    Controller,
    HttpCode,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';

import { ResponseMessage } from '@/common/decorators/responseMessage.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { Token } from '@/common/decorators/token.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt';
import { RoleGuard } from '@/common/guards/roles/role.guard';
import { PostBody } from '@/common/request/apiBody.posts';

import { PostDto } from './dtos/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post('')
    @ApiConsumes('multipart/form-data')
    @ApiBody(PostBody)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @Roles('USER')
    @HttpCode(200)
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
}
