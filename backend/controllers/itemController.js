import Item from "../models/itemModel.js";

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getItemsSortedByHighPrice = async (req, res) => {
  try {
    const sortedItems = await Item.find().sort({ price: -1 });
    res.json(sortedItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addItem = async (req, res) => {
  const { name, imageUrl, description, price } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ message: "Name and price are required" });
  }
  try {
    const newItem = new Item({ name, imageUrl, description, price });
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating item", error: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting item", error: err.message });
  }
};
