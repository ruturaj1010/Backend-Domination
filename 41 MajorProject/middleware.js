const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { reviewSchema, listingSchema } = require("./schema.js");
const ExpressError = require("./utilty/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
//   console.log(req);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in");
    res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You don`t have access to update");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((detail) => detail.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((detail) => detail.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewid } = req.params;
    const review = await Review.findById(reviewid);

    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect("back");
    }

    if (!res.locals.currUser) {
        req.flash("error", "You must be logged in to perform this action");
        return res.redirect("/login");
    }

    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You do not have permission to do that");
        return res.redirect("back");
    }

    next();
};
