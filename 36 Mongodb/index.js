const mongoose = require('mongoose');

main()
    .then(() => {
        console.log("DB has connected succesfully");
    })
    .catch(err => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const User = mongoose.model("User", userSchema);

// const user2 = new User ({
//     name: "Sakshi",
//     email :"sakshi@gmail.com",
//     age : 19
// })

// user2.save().then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// });

// User.deleteOne({name:"Aditya"}).then( res =>{
//     console.log(res);
// })

// User.updateOne({ name: "Sakshi" }, { email: "sakshi02@gmail.com" }).
//     then(res => {
//         console.log(res);
//     }).catch(err => {
//         console.log(err);
//     })

// User.find({name:"Sunita", age: {$gte : 39}}).then(res=>{
//     console.log(res);
// }).catch(err=> {
//     console.log(err);
// })


// User.insertMany([
//     {
//         name: "Vaibhav",
//         email: "vaibhav@gmail.com",
//         age: 19
//     },
//     {
//         name: "Aditya",
//         email: "aditya@gmail.com",
//         age: 24
//     },
//     {
//         name: "Ayush",
//         email: "ayush@gmail.com",
//         age: 20
//     }
// ]).then(res=>{
//     console.log(res);
// })

