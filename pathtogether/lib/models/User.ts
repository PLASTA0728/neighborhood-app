import mongoose, { model, models, Model } from 'mongoose';

export interface IUser {
    sessionNo: string;
    name: string;
    age: string;
    contact: string;
    role: string;
    location: {
        type: 'Point'; 
        coordinates: [number, number]; // longitude, latitude
    };
    customResponses: {
        fieldName: string;
        response: string;
    }[];
}

const userSchema = new mongoose.Schema({
    sessionNo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    role: { 
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: false,
        },
        coordinates: {
            type: [Number],
            required: false,
        }
    },
    customResponses: [
        {
            fieldName: { type: String, required: true },
            response: { type: String, required: true }
        }
    ]
});

userSchema.index({ location: '2dsphere' });

const UserModel: Model<IUser> = models.User || model<IUser>('User', userSchema);

export default UserModel;