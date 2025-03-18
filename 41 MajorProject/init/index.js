const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require("../models/listing.js");


main().then(() => {
    console.log("DB has benn initialized succesfully");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDatabase = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: '67d72a7e6e6cda7bceed2473' }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized succesfully");
}

initDatabase();