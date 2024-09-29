import mongoose from "mongoose"

const uri = process.env.ATLAS_URI || "";
const dbName = process.env.DB_NAME || "reviewmate"

if (uri.length === 0) {
  process.exit(-1)
}

class Db {
  constructor() {
    this.connectDb();
  }

  connectDb() {
    let dbOptions = {
      dbName: "" + dbName,
    }
    mongoose.connect(uri, dbOptions)
  }

  disconnectDb() {
    mongoose.connection.close()
  }
}

export default new Db();