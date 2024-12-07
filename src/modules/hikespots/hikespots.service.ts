import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/providers/prisma';

import { HikespotDto } from './dtos/hikespot.dto';

@Injectable()
export class HikespotsService {
    constructor(
        private readonly prismaService: PrismaService,
        // private readonly botService: BotService
    ) {}

    async create(hikespotDto: HikespotDto) {
        const hikespot = await this.prismaService.hike_spots.create({
            data: {
                lat: hikespotDto.lat,
                long: hikespotDto.long,
                place: hikespotDto.place,
                chat_id: hikespotDto.chat_id,
                phone_number: hikespotDto.phone_number,
            },
        });

        return hikespot;
    }

    async findNearestPost(lat: string, long: string) {
        const userLat = parseFloat(lat);
        const userLong = parseFloat(long);

        const hikeSpots = await this.prismaService.hike_spots.findMany();

        const nearestSpots = hikeSpots.filter((spot) => {
            const spotLat = parseFloat(spot.lat);
            const spotLong = parseFloat(spot.long);
            const distance = this.calculateDistance(
                userLat,
                userLong,
                spotLat,
                spotLong,
            );
            return distance <= 100;
        });

        if (nearestSpots) {
            return nearestSpots;
        } else return 'No nearest spot found';
    }

    private calculateDistance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number,
    ): number {
        const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
        const R = 6371e3; // Earth's radius in meters

        const φ1 = toRadians(lat1);
        const φ2 = toRadians(lat2);
        const Δφ = toRadians(lat2 - lat1);
        const Δλ = toRadians(lon2 - lon1);

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    }
}
