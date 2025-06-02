import express from "express";
import {
  getAllItems,
  getItemById,
  getItemsSortedByHighPrice,
  addItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/allItems", getAllItems);
router.get("/items/:id", getItemById);
router.get("/itemsSortedByHighPrice", getItemsSortedByHighPrice);
router.post("/addItem", addItem);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

export default router;
