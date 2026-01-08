import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    let DB_CONNECTION: string;
    if (process.env.NODE_ENV !== "production") {
      if (!process.env.MONGO_LOCAL_URI)
        throw new Error("MONGO_LOCAL_URI is not defined");
      DB_CONNECTION = process.env.MONGO_LOCAL_URI;
    } else {
      if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");
      DB_CONNECTION = process.env.MONGO_URI;
    }
    const dbResponse = await mongoose.connect(DB_CONNECTION);
    console.log("Connected to MongoDB", dbResponse.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
