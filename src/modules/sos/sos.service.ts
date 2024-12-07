import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { CustomException } from '@/common/response/CustomException';
import { PrismaService } from '@/providers/prisma';

import { SosDto } from './dtos/sos.dto';

@Injectable()
export class SosService {
    constructor(private readonly prismaService: PrismaService) {}

    private readonly apiUrl: string = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

    async sendAlert(chatId: string | number, user_id: string, sosDto: SosDto) {
        const user = await this.prismaService.users.findFirst({
            where: { id: user_id },
            select: { name: true },
        });

        const message = `Nama: ${user.name}\nLatitude: ${sosDto.lat}\nLongitude: ${sosDto.long}\nKetinggian: ${sosDto.height}\nTempat: ${sosDto.place}\n${sosDto.message}`;

        try {
            await axios.post(this.apiUrl, { chat_id: chatId, text: message });
        } catch (e) {
            throw new CustomException('Trouble in sending message to bot', 500);
        }

        const save = await this.prismaService.sos_alerts.create({
            data: {
                user_id: user_id,
                lat: sosDto.lat,
                long: sosDto.long,
                place: sosDto.place,
                message: sosDto.message,
                chat_id: chatId as string,
            },
        });

        return save;
    }
}
