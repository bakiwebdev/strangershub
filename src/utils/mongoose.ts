/* eslint-disable import/no-extraneous-dependencies */
import { connect, set } from "mongoose";
const dbString =
  process.env.DB_CONNECTION_STRING ||
  "mongodb://localhost:27017/strangershub?retryWrites=true&w=majority";

// connection to db
(async () => {
  try {
    set("strictQuery", false);
    const db = await connect(dbString);
    console.log("Db connectect to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
