const mongoose = require('mongoose');

main()
    .then(() => {
        console.log("DB has connected succesfully");
    })
    .catch(err => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

// const BooksSchema = new mongoose.Schema({
//     name : {
//         type : String,
//         require : true
//     },
//     author : {
//         type : String
//     },
//     price : {
//         type : Number
//     }
// })

// const Book = new mongoose.model("Book", BooksSchema);

// const book1 = new Book({
//     name : "The Great Gatsby",
//     author : "F. Scott Fitzgerald",
//     price : 499.99
// });

// book1.save();

const ElectronicSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxLength : 10
    },
    brand: {
        type: String
    },
    price: {
        type: Number
    },
    discount: {
        type: Number,
        default: 0
    }
})

const Electronic = new mongoose.model("Electronic", ElectronicSchema);

const electronic1 = new Electronic({
    name: "Samsung Galaxy S21",
    brand: "Samsung",
    price: 1299.99
});

electronic1.save().then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})