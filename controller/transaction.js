const Transaction = require("../models/transaction");

exports.getTransactions = async (req, res) => {
  try {
    if(req.user.id !== req.params.id) {
      res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const transactions = await Transaction.find(req.user.id);
    if (!transactions) {
      res.status(404).json({
        success: false,
        error: "Transaction not found",
      });
    }
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// get all of a user's transactions
exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({buyerId: req.params.id});
    if (!transactions) {
      res.status(404).json({
        success: false,
        error: "Transaction not found",
      });
    }
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      res.status(404).json({
        success: false,
        error: "Transaction not found",
      });
    }
    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// update

exports.updateTransaction = async (req, res) => {
  try {
    const updateTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updateTransaction) {
      res.status(404).json({
        success: false,
        error: "Transaction not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Transaction updated",
      data: updateTransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};