import { Router } from "express";
import jwt from "jsonwebtoken";
import { decrypt } from "../funcs";

const router = Router();

router.post("/", async (req, res) => {
  const user = await getUser(req);
  if (user) {
    const ok = await verifyLogin(user, req);
    if (ok) {
      jwt.sign({ user }, process.env.JWT_SCRT_KEY, (err, token) => {
        if (!err) {
          res.json({ user, token });
        } else {
          res.status(500).json({ err });
        }
      });
    } else {
      res.status(401).json({
        error: "Username and password do not match."
      });
    }
  } else {
    res.status(404).json({ error: "Username does not exist." });
  }
});

async function getUser(req) {
  const { username: givenUname, password: givenPwd } = req.body;
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
