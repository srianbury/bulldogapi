import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  url: {
    type: String
  }
});

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
