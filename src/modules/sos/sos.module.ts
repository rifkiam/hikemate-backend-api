import { Module } from '@nestjs/common';

import { PrismaService } from '@/providers/prisma';

import { SosController } from './sos.controller';
import { SosService } from './sos.service';

@Module({
    controllers: [SosController],
    providers: [SosService, PrismaService],
})
export class SosModule {}
