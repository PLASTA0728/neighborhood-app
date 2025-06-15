import { Schema, model, models, Model } from 'mongoose';
import type { ILocation, IUser } from '@/utils/types';
import { z } from 'zod';

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
      required: true
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
    age: {type: String, required: true },
    contact: {type: String, required: true },
    role: {type: String, required: true },
    location: {type: locationSchema, required: true},
    customResponses: [
        {
            fieldName: { type: String, required: true },
            response: { type: String, required: true },
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


// zod 

export const LocationSchema = z.object({
  type: z.literal("Point"),
  id: z.string(),
  coordinates: z.tuple([z.number(), z.number()]),
  displayName: z.string(),
});

export const UserSchema = z.object({
  name: z.string().min(1, "name is required"),
  age: z.string().optional(),
  contact: z.string().optional(),
  role: z.string().optional(),
  location: LocationSchema,
  customResponses: z
    .array(
      z.object({
        fieldName: z.string(),
        response: z.string(),
      })
    )
    .optional(),
});

export type UserInput = z.infer<typeof UserSchema>