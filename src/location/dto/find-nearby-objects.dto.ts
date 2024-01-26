import {IsNumber, IsOptional, Length} from "class-validator";

export class FindNearbyObjectsDto {
    @IsNumber()
    readonly lat: number;
    @IsNumber()
    readonly lon: number;
    @IsNumber()
    readonly radius: number;
    @Length(3)
    readonly object: string;
    @IsNumber()
    @IsOptional()
    readonly limit: number
}
