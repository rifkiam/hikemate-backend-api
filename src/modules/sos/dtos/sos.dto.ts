import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SosDto {
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
        example: '900',
    })
    @IsString()
    @IsNotEmpty()
    height: string;

    @ApiProperty({
        example: 'Gunung Lawu',
    })
    @IsString()
    @IsNotEmpty()
    place: string;

    @ApiProperty({
        example: 'Tolong Kami!',
    })
    @IsString()
    @IsNotEmpty()
    message: string;
}
