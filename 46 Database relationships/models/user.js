const mongoose = require('mongoose');

main().then(() => { console.log("Database has been connected successfully") }).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new mongoose.Schema({
    username : String,
    addresses : [{
        _id : false,
        location : String , 
        city : String
    }]
})

const User = mongoose.model("User", userSchema);


const addUsers = async () => {
    let user1 = new User({
        username : "John Doe",
        addresses : [
            { location : "123 Main St", city : "New York" },
        ],
    });

    user1.addresses.push({
        location : "789 Oak St",
        city : "Chicago"
    });

    const result = await user1.save();
    console.log(result);
};

addUsers();