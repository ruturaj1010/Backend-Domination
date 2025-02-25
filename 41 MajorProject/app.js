const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utilty/wrapAsync.js');
const ExpressError = require("./utilty/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main().then(res => {
    console.log("mongoose connected successfully");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

app.get("/testlisting", wrapAsync(async (req, res) => {
    let samplelistings = new Listing({
        title: "new villa",
        description: "Near the center of the beach",
        price: 1000000,
        location: "calaguate",
        country: "spain"
    })

    await samplelistings.save();
    res.send(samplelistings);
}));

app.get("/", (req, res) => {
    res.send("Working on root");
});

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(detail => detail.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(detail => detail.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// index Route 
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
}));

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})

// show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
}));

app.post("/listings", validateListing ,  wrapAsync(async (req, res) => {
    // const { title, description, price, location, country } = req.body;
    // let listing = req.body.listing;

    let result = listingSchema.validate(req.body);
    console.log(result);
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

app.put("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

app.delete("/listings/:id/delete", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedlist = await Listing.findByIdAndDelete(id);
    console.log(deletedlist)
    res.redirect("/listings");
}));

app.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    await newReview.save();

    listing.reviews.push(newReview);

    await listing.save();

    res.redirect(`/listings/${req.params.id}`);
}))

app.delete("/listings/:id/reviews/:reviewid", wrapAsync(async (req, res) => {
    let { id, reviewid } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);

    res.redirect(`/listings/${id}`);
}))

app.get("*", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
})

app.use((err, req, res, next) => {
    let { status = 505, message = "something went wrong" } = err;
    res.status(status).render("error.ejs", { message });
})

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});