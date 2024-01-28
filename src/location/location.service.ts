import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Location} from "./schemas/location.schema";
import * as mongoose from "mongoose";
import axios from "axios";
import {FindNearbyObjectsDto} from "./dto/find-nearby-objects.dto";

@Injectable()
export class LocationService {
    constructor(
        @InjectModel(Location.name)
        private locationModel: mongoose.Model<Location>,
    ) {}

    async getAll(): Promise<Location[]> {
        const locations = await this.locationModel.find();

        return locations;
    }

    async getById(id: string): Promise<Location> {
        const location = await this.locationModel.findById(id);

        if(!location) {
            throw new NotFoundException("Location not found");
        }

        return location;
    }

    async create(location: Location): Promise<Location> {
        const res = await this.locationModel.create(location);

        return res;
    }

    async updateById(id: string, location: Location): Promise<Location> {
        const updated = this.locationModel.findByIdAndUpdate(id, location, {
            new: true,
            runValidators: true
        });

        return updated;
    }

    async deleteById(id: string): Promise<Location> {
        const deleted = this.locationModel.findByIdAndDelete(id);

        return deleted;
    }


    async findNearbyObjectsByCoordinates(params: FindNearbyObjectsDto) {
        const {lat, lon, radius, object, limit} = params
        try {
            const oneMeter = 0.00001363 * 0.55
            const x1 = lon - oneMeter * radius
            const y1 = lat + oneMeter * radius
            const x2 = lon + oneMeter * radius
            const y2 = lat - oneMeter * radius

            const viewBoxCoordinates = `${x1.toPrecision(7)}, ${y1.toPrecision(7)}, ${x2.toPrecision(7)}, ${y2.toPrecision(7)}`
            const apiUrl = 'https://nominatim.openstreetmap.org/search';
            const params = {
                format: 'json',
                q: object,
                viewbox: viewBoxCoordinates,
                bounded: 1,
                dedupe: 0,
                ...(limit && {limit: limit})
            };

            const response = await axios.get(apiUrl, { params });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch data from OpenStreetMap API');
            }
        } catch (e) {
            console.error('Error:', e.message);
            throw e;
        }
    }

    async findNearbyObjectsByCoordinatesWithOverpass(params: FindNearbyObjectsDto) {
        const {lat, lon, radius, object} = params

        try {
            const apiUrl = 'https://overpass-api.de/api/interpreter';
            const params = {
                data:
                    `
                        [out:json];
                        node[amenity=${object}](around:${radius},${lat}, ${lon});
                        out;
                    `
            }
            const response = await axios.get(apiUrl, { params });
            if (response.status === 200) {
                return response.data.elements;
            } else {
                throw new Error('Failed to fetch data from OpenStreetMap API');
            }
        } catch (e) {
            console.error('Error:', e.message);
            throw e;
        }
    }

}
