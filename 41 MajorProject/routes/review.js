const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utilty/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const { createReviews, destroyReviews } = require("../controllers/reviews.js");

// post review route
router.post("/", isLoggedIn, validateReview, wrapAsync(createReviews));

// delete review route
router.delete(
  "/:reviewid",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(destroyReviews)
);

module.exports = router;
