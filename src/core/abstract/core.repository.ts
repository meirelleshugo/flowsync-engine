import mongoose from "mongoose";

export default abstract class CoreRepository<D> {
  protected readonly mongoDB: mongoose.Model<D>;

  constructor(mongoDB: mongoose.Model<D>) {
    this.mongoDB = mongoDB;
  }
}
