const express = require("express");
const transactionController = require("../controller/transaction");
const router = new express.Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/roles");
const {ROLES} = require('../constant/constant')


// Get all transactions
router.get("/",auth,role.check(ROLES.ADMIN, ROLES.SELLER), transactionController.getTransactions);

// Get a transaction
router.get("/:id", transactionController.getTransaction);

// Create a transaction
router.post("/",auth, transactionController.createTransaction);

// Update a transaction
router.patch("/:id",auth, transactionController.updateTransaction);

router.get("/user/:id",auth, transactionController.getUserTransactions);

module.exports = router;
