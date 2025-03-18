const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utilty/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview } = require("../middleware.js");

// post review route 
router.post("/", validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();
    req.flash("success" , "New Review has been created successfully");

    res.redirect(`/listings/${req.params.id}`);
}));

// delete review route 
router.delete("/:reviewid", wrapAsync(async (req, res) => {
    let { id, reviewid } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);

    req.flash("success" , "Review has been deleted successfully");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;