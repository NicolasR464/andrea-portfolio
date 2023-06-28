import mongoose, { Mongoose } from "mongoose";

let connectMongoose: () => Promise<Mongoose | null> = async () => {
  try {
    const uri =
      process.env.NODE_ENV === "development"
        ? process.env.MONGODB_URI_DEV
        : process.env.MONGODB_URI_PROD;
    if (!uri) throw new Error("Database URI not found");

    const connection = await mongoose.connect(uri);
    console.log("MONGOOSE ✔");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return null;
  }
};

export default connectMongoose;
