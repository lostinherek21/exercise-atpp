import mongoose from "mongoose";

const url = `mongodb://localhost:27017/atp-ch4-gallary`;

export default class Mongo {
  public async Connect() {
    await mongoose.connect(url);
  }
}
