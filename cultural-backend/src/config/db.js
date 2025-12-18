import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`mongoDB connected : ${conn.connection.host}`);
  } catch (err) {
    console.log(`mongoDB connection failed ${err.message}`);
    process.exit(1);
  }
};
