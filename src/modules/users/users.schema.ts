import { Schema, model } from "mongoose";

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

export const UsersMongoDB = model("users", UsersSchema);
