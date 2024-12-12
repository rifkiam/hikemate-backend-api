import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DestinationDto {
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
        example: 1321,
    })
    @IsNumber()
    @IsNotEmpty()
    mdpl: number;
}
