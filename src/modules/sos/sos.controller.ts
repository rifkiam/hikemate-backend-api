import {
    Body,
    Controller,
    HttpCode,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ResponseMessage } from '@/common/decorators/responseMessage.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { Token } from '@/common/decorators/token.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt';
import { RoleGuard } from '@/common/guards/roles/role.guard';

import { SosDto } from './dtos/sos.dto';
import { SosService } from './sos.service';

@Controller('sos')
export class SosController {
    constructor(private readonly sosService: SosService) {}

    @Post('/:chat_id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @Roles('USER')
    @HttpCode(200)
    @ResponseMessage('Successfully sent SOS message to telegram')
    async sendSosAlert(
        @Token('id') userId: string,
        @Query('chat_id') chatId: string,
        @Body() sosDto: SosDto,
    ) {
        // const chat_id = '1321805661';
        const response = await this.sosService.sendAlert(
            chatId,
            userId,
            sosDto,
        );
        return response;
    }
}
