import mongoose from "mongoose";

const blurpSchema = new mongoose.Schema({
  text: {
    type: String
  },
  name: {
    type: String
  }
});

const Blurp = mongoose.model("Blurp", blurpSchema);
export default Blurp;
