import { connect } from "mongoose";

export const connectToMongo = async () => {
  try {
    await connect(process.env.DB_URI as string);
    console.log(`connected to mongo`);
  } catch (err) {
    console.log("Can't connect to mongo", err);
  }
};
