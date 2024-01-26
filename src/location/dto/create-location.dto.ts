import {ApiProperty} from "@nestjs/swagger";

export class CreateLocationDto {
    @ApiProperty({example: "Title", description: "Name of location"})
    readonly title: string;
    @ApiProperty({example: "34.32412, 43.23423", description: "Coordinates of location"})
    readonly coordinates: string;
    @ApiProperty({example: "Ground", description: "Type of location"})
    readonly type: string;
}
