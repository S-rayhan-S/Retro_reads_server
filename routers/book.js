
const express = require("express");
const bookController = require("../controller/book");
const router = new express.Router();
const auth = require("../middlewares/auth");


// Get all books
router.get("/", bookController.getBooks);

// Get a book
router.get("/:id", bookController.getBook);

// Create a book
router.post("/", auth, bookController.createBook);

// Update a book
router.put("/:id",auth,bookController.updateBook);

// Delete a book
router.delete("/:id",auth, bookController.deleteBook);

// Get all books by a user
router.get("/user/:id", auth, bookController.getBooksByUser);

module.exports = router;
