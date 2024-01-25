import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {LocationService} from "./location.service";
import {Location} from './schemas/location.schema'
import {CreateLocationDto} from "./dto/create-location.dto";
import {UpdateLocationDto} from "./dto/update-location.dto";
import {FindNearbyObjectsDto} from "./dto/find-nearby-objects.dto";

@Controller('location')
export class LocationController {
    constructor(private locationService: LocationService) {}

    @Get()
    async getAllLocations(): Promise<Location[]> {
        return this.locationService.getAll();
    }

    @Get(':id')
    async getLocationById(@Param('id') id: string): Promise<Location> {
        return this.locationService.getById(id);
    }

    @Post()
    async createLocation(@Body() location: CreateLocationDto): Promise<Location> {
        return this.locationService.create(location);
    }

    @Put(':id')
    async updateLocationById(
        @Param('id') id: string,
        @Body() location: UpdateLocationDto
    ): Promise<Location> {
        return this.locationService.updateById(id, location);
    }

    @Delete(':id')
    async deleteLocationById(@Param('id') id: string,): Promise<Location> {
        return this.locationService.deleteById(id)
    }

    @UsePipes(new ValidationPipe())
    @Post('findNearbyObjects')
    async findNearbyObjectsByCoordinates(@Body() params: FindNearbyObjectsDto) {
        return this.locationService.findNearbyObjectsByCoordinates(params)
    }
}
