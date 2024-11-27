import { Module } from '@nestjs/common';

import { PrismaService } from '@/providers/prisma';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    providers: [PostsService, PrismaService],
    controllers: [PostsController],
    imports: [],
})
export class PostsModule {}
