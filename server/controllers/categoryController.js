const categories = require("../models/category");
const slugify = require("slugify");

exports.createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        massage: "Name is required",
      });
    }
    const existingCategory = await categories.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already exists",
      });
    }
    const category = await new categories({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New category added",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in category",
    });
  }
};

// get all categories

exports.getAllCategory = async (req, res) => {
  try {
    const category = await categories.find({});
    res.status(200).send({
      success: true,
      message: "all categories list",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

//update category

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categories.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category succesfully Updated",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in update",
    });
  }
};

//deleter category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categories.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
    });
  }
};
