import { Schema, Types, Document, model } from "mongoose";

export interface IMissile extends Document {
  name: string;
  description: string;
  speed: number;
  intercepts: string[];
  price: number;
}

export const missileSchema = new Schema<IMissile>({
  name: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  speed: {
    type: Number,
  },
  intercepts: {
    type: [String],
  },
  price: {
    type: Number,
  },
});

export default model<IMissile>("Missile", missileSchema);
