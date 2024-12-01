import { Prisma, PrismaClient, UserType } from '@prisma/client';

import { hashPassword } from '../../common/helpers/hash.helper';
import userData from './data/users.json';

const prisma = new PrismaClient();

export default async function usersSeeder() {
    for (const idx in userData) {
        const user = userData[idx];
        const userUpsert: Prisma.UsersCreateInput = {
            name: user.name,
            email: user.email,
            password: await hashPassword(user.password),
            birth_date: user.birth_date,
            country: user.country,
            user_type: user.user_type == 'ADMIN' ? UserType.ADMIN : 'USER',
            image_path: user.image_path,
        };

        await prisma.users.create({
            data: userUpsert,
        });
    }
    console.log('Users seeded successfully');
}
