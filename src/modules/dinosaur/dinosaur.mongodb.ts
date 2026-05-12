import mongoose from "mongoose";

const DinosaurSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const DinosaurMongoDB = mongoose.model("Dinosaur", DinosaurSchema);
