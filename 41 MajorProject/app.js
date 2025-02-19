const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

main().then(res => {
    console.log("mongoose connected successfully");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

app.get("/testlisting", async (req, res) => {
    let samplelistings = new Listing({
        title: "new villa",
        description: "Near the center of the beach",
        price: 1000000,
        location: "calaguate",
        country: "spain"
    })

    await samplelistings.save();
    res.send(samplelistings);
});

app.get("/", (req, res) => {
    res.send("Working on root");
});

// index Route 
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
})

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})

// show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
})

app.post("/listings", async (req, res) => {
    // const { title, description, price, location, country } = req.body;
    // let listing = req.body.listing;
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
})

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id/delete" , async (req , res)=>{
    let { id } = req.params;
    let deletedlist = await Listing.findByIdAndDelete(id);
    console.log(deletedlist)
    res.redirect("/listings");
})

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});