import mongoose from "mongoose";
import User from "./user";
import UserPassword from "./password";
import Dog from "./dogs";
import Litter from "./litters";
import Blurp from "./blurps";
import Gallery from "./gallery";

function connectDb() {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
}

const models = {
  User,
  UserPassword,
  Dog,
  Litter,
  Blurp,
  Gallery
};

export default models;
export { connectDb };
