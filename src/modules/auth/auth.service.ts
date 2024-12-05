import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePassword, hashPassword } from '@/common/helpers/hash.helper';
import { CustomException } from '@/common/response/CustomException';
import { PrismaService } from '@/providers/prisma';

import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prismaService.users.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new CustomException('Email/password not valid', 400);
        }

        const validatePassword = await comparePassword(password, user.password);

        if (!validatePassword) {
            throw new CustomException('Email/password not valid', 400);
        }

        return {
            access_token: this.jwtService.sign({
                email: user.email,
                id: user.id,
            }),
        };
    }

    async register(registerDto: RegisterDto) {
        const { name, email, password, birth_date, country } = registerDto;

        const user = await this.prismaService.users.findUnique({
            where: {
                email,
            },
        });

        if (user) {
            throw new NotFoundException('User already exists');
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await this.prismaService.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
                birth_date,
                country,
                user_type: 'USER',
                image_path: 'uploads/user/profile/user_profile.png',
            },
        });

        return {
            access_token: this.jwtService.sign({
                email: newUser.email,
                id: newUser.id,
            }),
        };
    }

    // Can be written separately in the user module
    async getUser(user_id: string) {
        const user = await this.prismaService.users.findUnique({
            where: {
                id: user_id,
            },
        });

        const { name, country, birth_date, email, user_type, image_path } =
            user;
        return {
            id: user_id,
            name,
            email,
            country,
            birth_date,
            role: user_type,
            image_path: process.env.APP_URL + image_path,
        };
    }
}
