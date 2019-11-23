import { Router } from "express";
import { verifyToken } from "../funcs";

const router = Router();

router.get("/", async (req, res) => {
  const dogs = await req.context.models.Dog.find();
  return res.json({ data: dogs });
});

router.get("/:id", async (req, res) => {
  const dog = await req.context.models.Dog.findById(req.params.id);
  return res.json({ data: dog });
});

router.put("/:id", verifyToken, async (req, res) => {
  const data = req.body;
  const updatedDocument = await req.context.models.Dog.findOneAndUpdate(
    { _id: req.params.id },
    { $set: data },
    { new: true }
  );
  return res.json({ data: updatedDocument });
});

export default router;
