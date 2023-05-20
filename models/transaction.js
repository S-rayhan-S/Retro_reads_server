const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  phone:{
    type: String,
    required: true,

  },
  info: {
    bookId: [],
    quantity:[],
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  tnxID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
