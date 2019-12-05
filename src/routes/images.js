import { Router } from "express";
import cloudinary from "cloudinary";
import cloudinaryStorage from "multer-storage-cloudinary";
import multer from "multer";
import { verifyToken, verifyAdminAccess } from "../funcs";

const router = Router();

const storage = cloudinaryStorage({
  cloudinary,
  folder: process.env.ENVIRONMENT,
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, crop: "limit" }]
});

const multerParser = multer({ storage });

router.post(
  "/",
  verifyToken,
  verifyAdminAccess,
  multerParser.array("images"),
  async (req, res) => {
    try {
      const images = req.files.map(image => ({
        url: image.url
      }));
      return res.json({ result: images });
    } catch (error) {
      console.log("catch error", error);
      return res.json({ error: "There was an error uploading your image." });
    }
  }
);

export default router;
