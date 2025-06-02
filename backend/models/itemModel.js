import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
