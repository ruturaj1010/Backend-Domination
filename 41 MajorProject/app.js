const express = require("express");
const app = express();
const mongoose = require("mongoose");

main().then(res => {
    console.log("mongoose connected successfully");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

app.get("/", (req, res) => {
    res.send("Working on root");
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});