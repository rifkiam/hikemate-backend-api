import { Injectable, OnModuleInit } from '@nestjs/common';
import { Hike_spots, Prisma } from '@prisma/client';
import { Context, Telegraf } from 'telegraf';

import { PrismaService } from '@/providers/prisma';

@Injectable()
export class BotService implements OnModuleInit {
    private readonly bot: Telegraf;

    constructor(private readonly prismaService: PrismaService) {
        this.bot = new Telegraf(
            '7611823220:AAGSyhIzZ9ZI8t8M6WPS7SvpVHtS70RllQM',
        );
    }

    onModuleInit() {
        this.setupBotCommands();
        this.bot.launch(); // Start the bot
    }

    setupBotCommands() {
        this.bot.start((ctx) => {
            ctx.reply(
                `Welcome to Hikemate Bot! Here are the commands you can use:
        \n/add_hikespot - Add a new hike spot
        \n/delete_hikespot - Delete hike spot in existing chat
        \n/help - List available commands`,
            );
        });

        this.bot.command('add_hikespot', async (ctx) => {
            ctx.reply('Enter latitude:');
            this.handleHikeSpotFlow(ctx);
        });

        this.bot.command('delete_hikespot', async (ctx) => {
            ctx.reply('Are you sure? (Y/N)');
            this.handleDeleteHikespotInChat(ctx);
        });
    }

    // Bot functions utilities
    async handleHikeSpotFlow(ctx: Context) {
        let step = 0;
        const tmpData: Prisma.Hike_spotsCreateInput = {
            lat: '',
            long: '',
            place: '',
            chat_id: '',
            phone_number: '',
        };
        let hikespot: Hike_spots;
        tmpData.chat_id = ctx.chat.id.toString();

        this.bot.on('text', async (userCtx) => {
            const message = userCtx.message.text;

            if (step === 0) {
                tmpData.lat = message;
                userCtx.reply('Enter longitude:');
                step++;
            } else if (step === 1) {
                tmpData.long = message;
                userCtx.reply('Enter name of the place:');
                step++;
            } else if (step === 2) {
                tmpData.place = message;
                userCtx.reply('Enter contact phone number:');
                step++;
            } else if (step === 3) {
                tmpData.phone_number = message;

                try {
                    hikespot = await this.prismaService.hike_spots.create({
                        data: tmpData,
                    });
                    step = 0; // Reset step

                    userCtx.reply(
                        `That's it! Your hike spot has been added.\nHikespot ID: ${hikespot.id}
            \nCheck your hikespot related data using http://...`,
                    );

                    return;
                } catch (e) {
                    userCtx.reply(`Error occurred: ${e}`);
                    return;
                }
            }
        });
    }

    async handleDeleteHikespotInChat(ctx: Context) {
        this.bot.on('text', async (userCtx) => {
            const message = userCtx.message.text;

            if (
                message === 'Y' ||
                message === 'y' ||
                message === 'yes' ||
                message === 'Yes'
            ) {
                const hikespot = await this.prismaService.hike_spots.findFirst({
                    where: { chat_id: ctx.chat.id.toString() },
                });

                if (!hikespot) {
                    ctx.reply(
                        "Hikespot with corresponding chat_id doesn't exist!",
                    );
                    return;
                }

                await this.prismaService.hike_spots.delete({
                    where: { chat_id: ctx.chat.id.toString() },
                });

                ctx.reply(
                    'Hikespot with corresponding chat_id has been deleted',
                );
                return;
            } else if (
                message === 'N' ||
                message === 'n' ||
                message === 'no' ||
                message === 'No'
            ) {
                return;
            } else {
                userCtx.reply('Enter the correct input');
                return;
            }
        });
        return;
    }
}
