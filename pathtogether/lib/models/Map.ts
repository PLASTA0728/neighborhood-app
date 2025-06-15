import mongoose, { Schema, Model, models, model } from 'mongoose';
import type { ICustomField, IMap } from "@/utils/types"
import z from 'zod';

const customFieldSchema = new Schema<ICustomField>(
    {
        fieldName: {type: String},
        fieldType: { 
            type: String,
            // enum: ["string", "number", "boolean", "date"],
        },
    },
    {_id: false }
);
 
const mapSchema = new mongoose.Schema<IMap>({
    groupName: { type: String, required: true, },
    mapName: { type: String, required: true, },
    sessionNo: { type: String, required: true, unique: true },
    customFields: [customFieldSchema],
},
);

const MapModel: Model<IMap> = models.Map || model<IMap>('Map', mapSchema);

export default MapModel;

export const CustomFieldSchema = z.object({
    fieldName: z.string(),
    fieldType: z.enum(["string", "number", "boolean", "date"]),
});

export const MapSchema = z.object({
    groupName: z.string().min(1, "group name is required"),
    mapName: z.string().min(1,"map name is required"),
    sessionNo: z.string(),
    customFields: z.array(CustomFieldSchema).optional(),
});

export type MapInput = z.infer<typeof MapSchema>;