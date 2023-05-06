/* eslint-disable import/no-extraneous-dependencies */
// import { connect, set } from "mongoose";
// const dbString =
//   process.env.DB_CONNECTION_STRING ||
//   "mongodb://localhost:27017/strangershub?retryWrites=true&w=majority";

// // connection to db
// (async () => {
//   try {
//     set("strictQuery", false);
//     const db = await connect(dbString);
//     console.log("Db connectect to", db.connection.name);
//   } catch (error) {
//     console.error(error);
//   }
// })();

import mongoose from "mongoose";

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  return await mongoose.connect(process.env.DB_CONNECTION_STRING || "");
};
