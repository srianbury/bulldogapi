import models from "../models";
import { encrypt } from "../funcs";
import { ACCESS, BLURPS } from "../constants";
import {
  parentsPlaceholders,
  litterPlaceholder,
  galleryPlaceholder
} from "./placeholders";

async function createUsersAndDogs() {
  const user1 = new models.User({
    username: "ricko",
    email: "bsunbury29+ricko@gmail.com",
    access: ACCESS.ADMIN
  });
  const user1Password = new models.UserPassword({
    uid: user1.id,
    password: encrypt("iamgroot")
  });
  const user2 = new models.User({
    username: "bob",
    email: "bsunbury29+bob@gmail.com",
    access: ACCESS.MINDFLAYER
  });
  const user2Password = new models.UserPassword({
    uid: user2.id,
    password: encrypt("heyarnold")
  });

  const homePuppyDesc = new models.Blurp({
    text:
      "We like to keep in touch with our pups and their families, here are some pics of the family!",
    name: BLURPS.PUPPIES
  });

  const homeAboutDesc = new models.Blurp({
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    name: BLURPS.ABOUT
  });

  parentsPlaceholders.map(async parent => {
    const dog = new models.Dog(parent);
    await dog.save();
  });

  litterPlaceholder.map(async litter => {
    const lit = new models.Litter(litter);
    await lit.save();
  });

  galleryPlaceholder.map(async post => {
    const img = new models.Gallery(post);
    await img.save();
  });

  await user1Password.save();
  await user2Password.save();

  await user1.save();
  await user2.save();

  await homePuppyDesc.save();
  await homeAboutDesc.save();
}

export default createUsersAndDogs;
