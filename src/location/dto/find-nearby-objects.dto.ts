import {IsNumber, IsOptional, Length} from "class-validator";

export class FindNearbyObjectsDto {
    @IsNumber()
    lat: number;
    @IsNumber()
    lon: number;
    @IsNumber()
    radius: number;
    @Length(3)
    object: string;
    @IsNumber()
    @IsOptional()
    limit: number
}
