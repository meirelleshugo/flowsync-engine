import mongoose from "mongoose";

export default abstract class CoreRepository<T> {

  protected mongoDB:
    mongoose.Model<any>;

  constructor(
    mongoDB: mongoose.Model<any>,
  ) {

    this.mongoDB =
      mongoDB;
  }
}