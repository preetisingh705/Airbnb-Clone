const express = require("express");
const router = express.Router( {mergeParams: true} );
const wrapAsync = require("../utils/wrapAsycn.js");
const { reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js")



//Post  review.route
router.post("/", isLoggedIn,validateReview, wrapAsync(reviewController.createReview));

// delete review route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;
