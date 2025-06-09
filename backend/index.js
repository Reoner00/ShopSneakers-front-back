import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import itemRoutes from "./routes/item.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3003;
const MONGO_URI =
  "mongodb+srv://Reoner:123@clustershop.ixsjxcp.mongodb.net/shop?retryWrites=true&w=majority";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend")));
app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.get("/", (_req, res) => {
  res.status(200).json({ message: "good" });
});

app.use("/item", itemRoutes);

app.use((_req, res) => {
  return res.status(400).json({
    message: "This endpoit does not exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
