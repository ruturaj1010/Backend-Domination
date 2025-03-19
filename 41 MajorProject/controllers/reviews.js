const Listing = require("../models/listing");
const Review = require("../models/review")

module.exports.createReviews = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();
    req.flash("success" , "New Review has been created successfully");

    res.redirect(`/listings/${req.params.id}`);
}

module.exports.destroyReviews = async (req, res) => {
    let { id , reviewid } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);

    req.flash("success" , "Review has been deleted successfully");
    res.redirect(`/listings/${id}`);
}