import { Router } from "express";
import { verifyToken, verifyAdminAccess } from "../funcs";

const router = Router();

router.get("/", async (req, res) => {
  const litters = await req.context.models.Litter.find();
  return res.json({ data: litters });
});

router.put("/:id", verifyToken, verifyAdminAccess, async (req, res) => {
  const data = req.body;
  const updatedDocument = await req.context.models.Litter.findOneAndUpdate(
    { _id: req.params.id },
    { $set: data },
    { new: true }
  );
  return res.json({ data: updatedDocument });
});

export default router;
