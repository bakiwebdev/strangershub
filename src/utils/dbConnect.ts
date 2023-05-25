import mongoose from "mongoose";

let cachedConnection: mongoose.Connection | null = null;

const dbConnect = async () => {
  try {
    if (cachedConnection) {
      return cachedConnection;
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const connection = await mongoose.connect(
      process.env.DB_CONNECTION_STRING || "",
      options
    );
    cachedConnection = connection.connection;
    return connection.connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export default dbConnect;
