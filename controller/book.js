const Book = require("../models/book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    console.log(books);
    if(!books || books.length === 0){
      res.status(400).json({
        error: "Book Not Found"
      })
    }
    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// get books by a user
exports.getBooksByUser = async (req, res) => {
  try {
    const books = await Book.find({addBy: req.params.id});
    if(!books){
      res.status(400).json({
        error: "Book Not Found"
      })
    }
    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }

};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
  
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    console.log(book);
    if (!book) {
      res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.searchBook = async (req, res) => {
  try {
    const books = await Book.find({
      $or: [{ title: { $regex: req.params.keyword, $options: "i" } }],
    });
    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
