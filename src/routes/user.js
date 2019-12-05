import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const users = "N/A"; //await req.context.models.User.find();
  return res.json({ users });
});

router.get("/:userId", async (req, res) => {
  const user = "N/A"; // await req.context.models.User.findById(req.params.userId);
  return res.json({ user });
});

export default router;
