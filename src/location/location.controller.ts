import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {LocationService} from "./location.service";
import {Location} from './schemas/location.schema'
import {CreateLocationDto} from "./dto/create-location.dto";
import {UpdateLocationDto} from "./dto/update-location.dto";
import {FindNearbyObjectsDto} from "./dto/find-nearby-objects.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("Locations")
@Controller('location')
export class LocationController {
    constructor(private locationService: LocationService) {}

    @ApiOperation({summary: 'Get all locations'})
    @ApiResponse({status: 200, type: [Location]})
    @Get()
    async getAllLocations(): Promise<Location[]> {
        return this.locationService.getAll();
    }

    @ApiOperation({summary: 'Get location by ID'})
    @ApiResponse({status: 200, type: Location})
    @Get(':id')
    async getLocationById(@Param('id') id: string): Promise<Location> {
        return this.locationService.getById(id);
    }

    @ApiOperation({summary: 'Create new location'})
    @ApiResponse({status: 200, type: Location})
    @Post()
    async createLocation(@Body() location: CreateLocationDto): Promise<Location> {
        return this.locationService.create(location);
    }

    @ApiOperation({summary: 'Update location by ID'})
    @ApiResponse({status: 200, type: Location})
    @Put(':id')
    async updateLocationById(
        @Param('id') id: string,
        @Body() location: UpdateLocationDto
    ): Promise<Location> {
        return this.locationService.updateById(id, location);
    }

    @ApiOperation({summary: 'Delete location by ID'})
    @ApiResponse({status: 200, type: Location})
    @Delete(':id')
    async deleteLocationById(@Param('id') id: string,): Promise<Location> {
        return this.locationService.deleteById(id)
    }

    @ApiOperation({summary: 'Find nearby places according to given coordinates'})
    @ApiResponse({status: 200})
    @UsePipes(new ValidationPipe())
    @Post('findNearbyObjects')
    async findNearbyObjectsByCoordinates(@Body() params: FindNearbyObjectsDto) {
        return this.locationService.findNearbyObjectsByCoordinates(params)
    }
}
