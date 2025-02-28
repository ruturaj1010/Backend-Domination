const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError = require("./utilty/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


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

// app.get("/testlisting", wrapAsync(async (req, res) => {
//     let samplelistings = new Listing({
//         title: "new villa",
//         description: "Near the center of the beach",
//         price: 1000000,
//         location: "calaguate",
//         country: "spain"
//     })

//     await samplelistings.save();
//     res.send(samplelistings);
// }));

// app.get("/", (req, res) => {
//     res.send("Working on root");
// });

app.use("/listings", listings);
app.use("/listings/:id/reviews" , reviews )

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