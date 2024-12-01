import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        example: 'Use new',
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'newuser@gmail.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password',
    })
    @IsString()
    password: string;

    @ApiProperty({
        example: '2000-12-01T00:00:00.000Z',
    })
    @IsDate()
    @Type(() => Date)
    birth_date: Date;

    @ApiProperty({
        example: 'Indonesia',
    })
    @IsString()
    country: string;
}
