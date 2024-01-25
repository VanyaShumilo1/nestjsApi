import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Location {
    @Prop({required: true})
    title: string;
    @Prop({required: true})
    coordinates: string;
    @Prop({required: true})
    type: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
