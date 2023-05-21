
const express = require("express");
const categoryController = require("../controller/category");
const router = new express.Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/roles");
const {ROLES} = require('../constant/constant')

// Get all categories
router.get("/", categoryController.getCategories);

// Get a category
router.get("/:id", categoryController.getCategory);

// Create a category
router.post("/",auth,categoryController.createCategory);

// Update a category
router.patch("/:id",auth, categoryController.updateCategory);

// Delete a category
router.delete("/:id",auth, categoryController.deleteCategory);

module.exports = router;
