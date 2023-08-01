const express = require("express");
const {
  createCategoryController,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-category", requireSignIn, isAdmin, createCategoryController);
router.get("/category-list", getAllCategory);
//update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory);
router.delete("/delete-category/:id", deleteCategory);

module.exports = router;
