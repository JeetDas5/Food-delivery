import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item

export const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    image: image_filename,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.log("Error");
    res.json({ success: false, message: "Error" });
  }
};

//all food list

export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("Error");
    res.json({ success: false, message: "Error" });
  }
};

//remove food item

export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.log("Error");
    res.json({ success: false, message: "Error" });
  }
};
