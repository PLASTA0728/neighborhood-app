import { Schema, model, models, Model, ObjectId } from 'mongoose';

interface ICustomResponse {
  fieldName: string;
  response: string;
}

export interface ILocation {
  type: 'Point';
  id: string;
  coordinates: [number, number];
  displayName: string;
}


export interface IUser {
  name: string;
  age: string;
  contact: string;
  role: string;
  location?: ILocation;
  customResponses: ICustomResponse[];
  _id: ObjectId;
}

interface ISession {
  sessionNo: string;
  users: IUser[];
}


const userSchema = new Schema<IUser>(
  {
    name: {type: String, required: true },
    age: {type: String, required: true },
    contact: {type: String, required: true },
    role: {type: String, required: true },
    location: {
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
    },
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