import { Router } from "express";
import jwt from "jsonwebtoken";
import { check } from "express-validator";
import { encrypt } from "../funcs";
import { useParameterValidation } from "../middleware";

const router = Router();

const requiredPostParams = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("Username cannot be blank"),
  check("email")
    .isEmail()
    .withMessage("Email is poorly formatted"),
  check("password")
    .isLength({ min: 10 })
    .withMessage("Password must be at least 10 characters")
];
router.post(
  "/",
  requiredPostParams,
  useParameterValidation,
  async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(409).json({ error: "Passwords do not match." });
    }

    try {
      const user = await req.context.models.User.create({
        username,
        email,
      });
      await req.context.models.UserPassword.create({
        uid: user._id,
        password: encrypt(password)
      });

      jwt.sign({ user }, process.env.JWT_SCRT_KEY, (error, token) => {
        if (error) {
          return res.status(500).json({ error });
        } else {
          return res.json({ user, token });
        }
      });
    } catch (e) {
      // catch mongo db duplicate key error
      if (e.name === "MongoError" && e.code === 11000) {
        return res.status(409).json({ error: "Username or email already exists." });
      }
    }
  }
);

export default router;
