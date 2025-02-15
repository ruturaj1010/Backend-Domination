const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => {
    console.log("mongoose has been connected succesfully");
}).catch(err => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const allChats = [
    {
        from: "Sneha",
        to: "Aditya",
        msg: "Same here, lots of meetings today!",
        created_at: new Date()
    },
    {
        from: "Rohit",
        to: "Priya",
        msg: "Hey Priya, long time no see!",
        created_at: new Date()
    },
    {
        from: "Supriya",
        to: "Raj",
        msg: "I know right! How have you been?",
        created_at: new Date()
    },
    {
        from: "Varad",
        to: "Yashshri",
        msg: "Pretty good! some old friends yesterday.",
        created_at: new Date()
    },
    {
        from: "Vinod",
        to: "Janhvi",
        msg: "Not yet, I'll finish it by tonight.",
        created_at: new Date()
    },
    {
        from: "Swayam",
        to: "Anish",
        msg: "Great! Let me know if you need any help.",
        created_at: new Date()
    },
    {
        from: "Anisha",
        to: "Bhumika",
        msg: "Sure, thanks!",
        created_at: new Date()
    }
];

Chat.insertMany(allChats).then((res) => {
    console.log(res);
}).catch(err => {
    console.log(err);
});
