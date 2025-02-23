const mongoose = require('mongoose');

main().then(() => { 
    console.log("Database has been connected successfully") 
}).catch( err => {
    console.log(err)
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
};

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
});

const postSchema = new mongoose.Schema({
    content : String,
    likes : String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})

const User = mongoose.model("User" , userSchema);

const Post = mongoose.model("Post" , postSchema);


// while adding collection for the first time
const addData = async () => {
    let user1 = new User({
        username : "John Doe",
        email : "johndoe@example.com"
    });

    let post1 = new Post({
        content : "This is my first post",
        likes : 455,
    });
    
    post1.user = user1;

    await user1.save();
    await post1.save();

}

const adddata = async () => {
    let user = await User.findOne({username: "John Doe"});

    let post2 = new Post ({
        content : "This is my second post",
        likes : 2343434,
    })

    post2.user = user;

    await post2.save();
}

adddata();