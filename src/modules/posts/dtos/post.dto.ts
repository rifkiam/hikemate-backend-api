import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostDto {
    @ApiProperty({
        example: 'Post Title',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: 'Content',
    })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        example: 'Gunung Lawu',
    })
    @IsString()
    @IsNotEmpty()
    place: string;
}

export class PatchDto {
    @ApiProperty({
        example: 'Post Title',
    })
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty({
        example: 'Content',
    })
    @IsString()
    @IsOptional()
    content: string;

    @ApiProperty({
        example: 'Gunung Lawu',
    })
    @IsString()
    @IsOptional()
    place: string;
}
