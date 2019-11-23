import mongoose from "mongoose";
import User from "./user";
import UserPassword from "./password";
import Dog from "./dogs";
import Litter from "./litters";
import Blurp from "./blurps";
import Gallery from "./gallery";
import { populatedb } from "../dev";

async function connectDb() {
  return await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
}

async function populate(eraseDbOnReload) {
  if (eraseDbOnReload) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Dog.deleteMany({}),
      models.UserPassword.deleteMany({}),
      models.Litter.deleteMany({}),
      models.Blurp.deleteMany({}),
      models.Gallery.deleteMany({})
    ]);

    await populatedb();
  }
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
export { connectDb, populate };
