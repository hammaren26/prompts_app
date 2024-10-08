import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    console.log("Trying to connect to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      serverSelectionTimeoutMS: 30000, // Увеличиваем таймаут до 30 секунд
    });

    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
