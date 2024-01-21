import mongoose, { model, models } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      type: String,
    },
    phone: {
      type: String
    },
    address: {
      type: String
    },
    postalCode: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    }
  },
  { timestamps: true }
);

export const User = models?.User || model("User", UserSchema);
