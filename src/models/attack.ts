import mongoose, { ObjectId, Schema, Types } from "mongoose";
export interface IAttack {
  name: string;
  idAttacker: Schema.Types.ObjectId;
  idIntercepted?: Schema.Types.ObjectId; //אם הוא יורט באמת
  timeAttack?: Date;
  area?: string;
  status?: "sent" | "fell" | "intercepted";
}
const attackSchema = new Schema<IAttack>({
  name: String, //שם הטיל
  idAttacker: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }, //מזהה של האדם ששלח את הטיל
  idIntercepted: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }, //מזהה של האדם שירט את הטיל
  timeAttack: {
    type: Date,
    default: Date.now,
  },
  area: {
    type: String,
  },
  status: {
    type: String,
    default: "sent",
  },
});

export default mongoose.model<IAttack>("Attack", attackSchema);
