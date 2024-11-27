import { ApiBodyOptions } from '@nestjs/swagger';

export const PostBody: ApiBodyOptions = {
    schema: {
        type: 'object',
        properties: {
            title: { type: 'string', example: 'Post Title' },
            content: { type: 'string', example: 'Content' },
            place: { type: 'string', example: 'Gunung Lawu' },
            file: { type: 'string', format: 'binary' },
        },
    },
};
