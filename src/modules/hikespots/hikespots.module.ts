import { Module } from '@nestjs/common';

import { PrismaService } from '@/providers/prisma';

import { BotService } from './bot.service';
import { HikespotsController } from './hikespots.controller';
import { HikespotsService } from './hikespots.service';

@Module({
    controllers: [HikespotsController],
    providers: [HikespotsService, BotService, PrismaService],
})
export class HikespotsModule {}
