import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";

@Schema({
    timestamps: true
})
export class Location {
    @ApiProperty({example: "Some title", description: "Name of location"})
    @Prop({required: true})
    title: string;
    @ApiProperty({example: "34.32412, 43.23423", description: "Coordinates of location"})
    @Prop({required: true})
    coordinates: string;
    @ApiProperty({example: "Ground", description: "Type of location"})
    @Prop({required: true})
    type: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
