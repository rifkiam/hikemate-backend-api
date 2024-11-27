import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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

    // @ApiProperty({
    //     description: 'File to upload preferably an image'
    // })
    // @IsNotEmpty()
    // file: Express.Multer.File;
}
