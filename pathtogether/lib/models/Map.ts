import mongoose, { Schema, Model, models, model, Document } from 'mongoose';

export interface ICustomField {
    fieldName?: string;
    fieldType?: string;
}

export interface IMap extends Document {
    groupName: string;
    mapName: string;
    sessionNo: string;
    // template?: string;
    customFields?: ICustomField[];
}

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
{
    timestamps: true,
});


const MapModel: Model<IMap> = models.Map || model<IMap>('Map', mapSchema);

export default MapModel;