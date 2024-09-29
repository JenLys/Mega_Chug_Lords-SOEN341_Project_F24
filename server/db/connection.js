import mongoose from "mongoose";

const uri = process.env.ATLAS_URI || "";
const dbName = process.env.DB_NAME || "reviewmate";

if (uri.length === 0) {
  process.exit(-1);
}

class Db {
  constructor() {
    this.connectDb();
  }

  connectDb() {
    let dbOptions = {
      dbName: "" + dbName,
    };
    mongoose.connect(uri, dbOptions);
    console.log("Connected to MongoDB");
  }

  disconnectDb() {
    mongoose.connection.close();
  }

  async getAll(collectionSchema) {
    const collection = collectionSchema.find();
    return collection;
  }
}

export default new Db();
