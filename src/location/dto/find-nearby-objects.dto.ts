import {IsLatitude, IsLongitude, IsNumber, IsOptional, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class FindNearbyObjectsDto {
    @ApiProperty({example: 48.61299, description: "Latitude"})
    @IsLatitude()
    readonly lat: number;
    @ApiProperty({example: 22.2827, description: "Longitude"})
    @IsLongitude()
    readonly lon: number;
    @ApiProperty({example: 5000, description: "Radius in meters"})
    @IsNumber()
    readonly radius: number;
    @ApiProperty({example: "Hospital", description: "Object to search"})
    @Length(3)
    readonly object: string;
    @ApiProperty({example: "10", description: "Maximum number of results"})
    @IsNumber()
    @IsOptional()
    readonly limit: number
}
