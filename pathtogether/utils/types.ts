import { ObjectId } from "mongoose";

export interface ICustomResponse {
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
  location: ILocation;
  customResponses: ICustomResponse[];
  // _id: ObjectId;
}

export interface ICustomField {
  fieldName?: string;
  fieldType?: string;
}

export interface IMap {
  groupName: string;
  mapName: string;
  sessionNo: string;
  customFields?: ICustomField[];
}