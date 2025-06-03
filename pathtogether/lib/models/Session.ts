import { Schema, model, models, Model } from 'mongoose';

interface CustomResponse {
  fieldName: string;
  response: string;
}

export interface IUser {
  name: string;
  age: string;
  contact: string;
  role: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  customResponses: CustomResponse[];
}

interface ISession {
  sessionNo: string;
  mapName?: string;
  groupName?: string;
  users: IUser[];
}


const userSchema = new Schema({
    name: {type: String, required: true },
    age: {type: String, required: true },
    contact: {type: String, required: true },
    role: {type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: [Number]
    },
    customResponses: [
        {
            fieldName: { type: String, required: true },
            response: { type: String, required: true },
            _id: false,
        }
    ]
});

const sessionSchema = new Schema({
    sessionNo: { type: String, required: true, unique: true }, 
    users: [userSchema]
});

sessionSchema.index({ 'users.location': '2dsphere' });

const SessionModel: Model<ISession> = models.Session || model<ISession>('Session', sessionSchema);

export default SessionModel;