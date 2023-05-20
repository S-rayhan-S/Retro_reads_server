const express = require("express");
const reviewController = require("../controller/review");
const router = new express.Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/roles");
const {ROLES} = require('../constant/constant')

// Get all reviews
router.get("/", auth, role.check(ROLES.ADMIN, ROLES.SELLER),reviewController.getReviews);

// Get a review
router.get("/:id", reviewController.getReview);

// Create a review
router.post("/",auth, reviewController.createReview);

// Update a review
router.patch("/:id",auth, reviewController.updateReview);

// Delete a review
router.delete("/:id",auth,role.check(ROLES.ADMIN), reviewController.deleteReview);

module.exports = router;