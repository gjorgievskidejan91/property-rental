import mongoose from "mongoose";
import { setGlobal } from "next/dist/trace";

let connected = false;

const connectDb = async () => {
  mongoose.set("strictQuery", true);

  //If the database is already connected
  if (connected) {
    console.log("Data base alredy connected");
    return;
  }

  //Connect Db
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb Connected...");
    connected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
