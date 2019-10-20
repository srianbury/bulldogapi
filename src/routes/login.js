import { Router } from "express";
import jwt from "jsonwebtoken";
import { decrypt } from "../funcs";

const router = Router();

router.post("/", async (req, res) => {
  const user = await getUser(req);
  if (!user) {
    return res.status(404).json({ error: "Username does not exist." });
  }

  const pwdMatch = await verifyLogin(user, req);
  if (!pwdMatch) {
    return res
      .status(401)
      .json({ error: "Username and password do not match." });
  }

  jwt.sign({ user }, process.env.JWT_SCRT_KEY, (err, token) => {
    if (err) {
      return res.status(500).json({ err });
    } else {
      return res.json({ user, token });      
    }
  });
});

async function getUser(req) {
  const { username: givenUname } = req.body;
  const user = await req.context.models.User.findByLogin(givenUname);
  return user;
}

async function verifyLogin(user, req) {
  const { password: givenPwd } = req.body;
  const { _id: uid } = user;

  const userPwd = await req.context.models.UserPassword.findByUid(uid);
  const { password: dbPwd } = await userPwd;

  return givenPwd === decrypt(dbPwd) ? user : null;
}

export default router;
