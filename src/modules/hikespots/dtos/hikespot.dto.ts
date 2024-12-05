import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HikespotDto {
    @ApiProperty({
        example: '-7.289959',
    })
    @IsString()
    @IsNotEmpty()
    lat: string;

    @ApiProperty({
        example: '112.813325',
    })
    @IsString()
    @IsNotEmpty()
    long: string;

    @ApiProperty({
        example: 'Gunung Sembrani',
    })
    @IsString()
    @IsNotEmpty()
    place: string;

    @ApiProperty({
        example: '1321805662',
    })
    @IsString()
    @IsNotEmpty()
    chat_id: string;

    @ApiProperty({
        example: '082257328991',
    })
    @IsString()
    @IsNotEmpty()
    phone_number: string;
}
