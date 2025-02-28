const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js"); 
const { listingSchema } = require("../schema.js");
const wrapAsync = require("../utilty/wrapAsync.js");
const ExpressError = require("../utilty/ExpressError.js");

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(detail => detail.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// index route 
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
}));

// new route 
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
})

// show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
}));


// create route 
router.post("/", validateListing ,  wrapAsync(async (req, res) => {
    // const { title, description, price, location, country } = req.body;
    // let listing = req.body.listing;

    let result = listingSchema.validate(req.body);
    console.log(result);
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));


// read route 
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

// delete route 
router.delete("/:id/delete", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedlist = await Listing.findByIdAndDelete(id);
    console.log(deletedlist)
    res.redirect("/listings");
}));


// update route 
router.put("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

module.exports = router;