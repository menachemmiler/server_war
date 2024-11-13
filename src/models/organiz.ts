import { Schema, Types, Document, model } from "mongoose";

export interface IResources extends Document {
  name: string;
  amount: number;
}

export interface IOrganiz extends Document {
  name: string;
  resources: IResources[];
  budget: number;
}

const ResourceSchema: Schema = new Schema<IResources>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

export const organizSchema = new Schema<IOrganiz>({
  name: {
    type: String,
  },
  resources: { type: [ResourceSchema], required: true },
  budget: { type: Number, required: true },
});

export default model<IOrganiz>("Organiz", organizSchema);
