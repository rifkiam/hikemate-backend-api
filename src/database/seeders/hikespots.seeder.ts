import { Prisma, PrismaClient } from '@prisma/client';

import hikespotsData from './data/hikespots.json';

const prisma = new PrismaClient();

export default async function usersSeeder() {
    for (const idx in hikespotsData) {
        const hikespots = hikespotsData[idx];
        const hikespotsUpsert: Prisma.Hike_spotsCreateInput = {
            lat: hikespots.lat,
            long: hikespots.long,
            place: hikespots.place,
            chat_id: hikespots.chat_id,
            phone_number: hikespots.phone_number,
        };

        await prisma.hike_spots.create({
            data: hikespotsUpsert,
        });
    }
    console.log('Hikespots seeded successfully');
}
