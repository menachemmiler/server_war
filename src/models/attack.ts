import mongoose, { Schema } from "mongoose";
export interface IAttack {
    name: string;
    timeToHit: number;
    idAttacker: string;
    idIntercepted?: string;//אם הוא יורט באמת
}
const attackSchema = new Schema<IAttack>({
    name: String,//שם הטיל 
    timeToHit: Number,//
    idAttacker: String,//מזהה של האדם ששלח את הטיל
    idIntercepted: String,//מזהה של האדם שירט את הטיל
});
export default mongoose.model<IAttack>("Attack", attackSchema)