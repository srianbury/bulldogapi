import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const galleryImages = await req.context.models.Gallery.find();
  return res.json({ data: galleryImages });
});

export default router;
