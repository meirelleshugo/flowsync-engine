import {
  type HydratedDocument,
  type Model,
  models,
  Schema,
  model,
} from "mongoose";

interface Dinosaur {
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
}

interface DinosaurMethods {
  updateDescription(
    this: HydratedDocument<Dinosaur>,
    description: string,
  ): Promise<HydratedDocument<Dinosaur>>;
}

type DinosaurModel = Model<Dinosaur, {}, DinosaurMethods>;

const dinosaurSchema = new Schema<Dinosaur, DinosaurModel, DinosaurMethods>(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

dinosaurSchema.methods.updateDescription = async function (
  this: HydratedDocument<Dinosaur>,
  description: string,
) {
  this.description = description;
  return await this.save();
};

export default (models.Dinosaur as DinosaurModel) ||
  model<Dinosaur, DinosaurModel>("Dinosaur", dinosaurSchema);
