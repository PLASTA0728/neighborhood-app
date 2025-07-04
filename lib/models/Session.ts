import { Schema, model, models, Model } from 'mongoose';
import type { ILocation, IUser } from '@/utils/types';

interface ISession {
  sessionNo: string;
  users: IUser[];
}

const locationSchema = new Schema<ILocation>(
  { 
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    id: {
      type: String,
      required: false
    },
    coordinates: {
      type: [Number],
      validate: {
        validator: (val: number[]) => val.length === 2,
        message: 'coordinates must be [lat, lng]'
      }
    },
    displayName: {
      type: String,
      required: true
    }
  }
)

const userSchema = new Schema<IUser>(
  {
    name: {type: String, required: true },
    age: {type: String, required: false },
    contact: {type: String, required: false },
    role: {type: String, required: false },
    location: {type: locationSchema, required: true},
    customResponses: [
        {
            fieldName: { type: String, required: false },
            response: { type: String, required: false },
            _id: false        
        }
    ],
  }
);

const sessionSchema = new Schema({
    sessionNo: { type: String, required: true, unique: true }, 
    users: [userSchema]
});

sessionSchema.index({ 'users.location': '2dsphere' });

const SessionModel: Model<ISession> = models.Session || model<ISession>('Session', sessionSchema);

export default SessionModel;