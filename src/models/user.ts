import { Schema, Types, Document, model } from "mongoose";
import {  IOrganiz, organizSchema } from "./organiz";

export interface IUser extends Document {
  username: string;
  password: string;
  organiz: IOrganiz;
  area: string;
}


const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
  },
  password: { type: String, required: true },
  organiz: {
    type: organizSchema,
  },
  area: { type: String },
});

export default model<IUser>("User", userSchema);
