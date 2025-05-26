import mongoose, { Schema, model, models, Model } from 'mongoose';

export interface ILocationCoordinates {

}

export interface IUser {
    sessionNo: string;
    name: string;
    age: string;
    contact: string;
    role: string;
    location: {
        type: 'Point'; 
        coordinates: [number, number]; // longitude, latitude
    }
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
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    }
});

userSchema.index({ location: '2dsphere' });

export default mongoose.models.User || mongoose.model('User', userSchema); // first check if User model has already been registered in Mongoose, otherwise define a new model called User with userSchema