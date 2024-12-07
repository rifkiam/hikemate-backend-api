import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ResponseMessage } from '@/common/decorators/responseMessage.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt';
import { RoleGuard } from '@/common/guards/roles/role.guard';

import { HikespotDto } from './dtos/hikespot.dto';
import { HikespotsService } from './hikespots.service';

@Controller('hikespots')
@ApiTags('Hikespots')
export class HikespotsController {
    constructor(private readonly hikespotsService: HikespotsService) {}

    @Get('')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @Roles('USER', 'ADMIN')
    @HttpCode(200)
    @ResponseMessage('Successfully fetched all hikespots')
    async getAllHikespots() {
        const response = await this.hikespotsService.getAllHikespots();
        return response;
    }

    @Post('')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @Roles('ADMIN')
    @HttpCode(201)
    @ResponseMessage('Successfully created a Hikespot Post')
    async create(@Body() createHikespotDto: HikespotDto) {
        const response = await this.hikespotsService.create(createHikespotDto);
        return response;
    }

    @Get('/:lat/:long')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @Roles('USER')
    @HttpCode(200)
    @ResponseMessage('Successfully fetched a post')
    async findNearest(@Param('lat') lat: string, @Param('long') long: string) {
        const response = this.hikespotsService.findNearestPost(lat, long);
        return response;
    }
}
