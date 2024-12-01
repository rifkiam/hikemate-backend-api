import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import path from 'path';

import { AllExceptionsFilter } from '@/common/filters/exception.filter';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
// ###################
// ## Child modules ##
// ###################
import { AuthModule } from '@/modules/auth';
import { PostsModule } from '@/modules/posts';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                pool: true,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            },
            template: {
                dir: path.resolve(__dirname + '../../templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        ServeStaticModule.forRoot({
            rootPath: path.join(
                __dirname,
                '..',
                '..',
                'storage/uploads/user/posts',
            ), // Path to the folder
            serveRoot: '/uploads/user/posts', // URL alias
        }),
        ServeStaticModule.forRoot({
            rootPath: path.join(
                __dirname,
                '..',
                '..',
                'storage/uploads/user/profile',
            ), // Path to the folder
            serveRoot: '/uploads/user/profile', // URL alias
        }),
        AuthModule,
        PostsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule {}
