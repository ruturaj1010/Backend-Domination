const express = require("express");
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utilty/ExpressError.js");
const wrapAsync = require("../utilty/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(detail => detail.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// post review route 
router.post("/", validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    await newReview.save();

    listing.reviews.push(newReview);

    await listing.save();

    res.redirect(`/listings/${req.params.id}`);
}))

// delete review route 
router.delete("/:reviewid", wrapAsync(async (req, res) => {
    let { id, reviewid } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);

    res.redirect(`/listings/${id}`);
}))

module.exports = router;