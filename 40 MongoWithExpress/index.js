const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

main().then(() => {
    console.log("mongoose has been connected succesfully");
}).catch(err => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newmsg } = req.body;
    // console.log(newmsg);
    await Chat.findByIdAndUpdate(id, { msg: newmsg, created_at: new Date() }, { runValidators: true, new: true });
    res.redirect("/chats");
})

app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(err => next(err));
    }
}

app.get("/chats", wrapAsync(async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    // res.send("working");
    res.render("index.ejs", { chats });
}));

app.get("/", (req, res) => {
    res.send("Welcome to port 8080");
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/chats", (req, res) => {
    const { from, to, msg } = req.body;
    const newchat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    console.log(newchat);

    newchat.save().then(result => {
        console.log(result);
    }).catch(err =>
        console.log(err)
    );
    res.redirect("/chats");
});

app.get("/chats/:id/edit", (req, res) => {
    let { id } = req.params;
    Chat.findById(id).then(chat => {
        res.render("edit.ejs", { chat });
    }).catch(err => {
        console.log(err);
    });
});

// Created new route for middlewares
app.get("/chats/:id", async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        next(new ExpressError(404, "Chat not found"));
    }
    res.render("edit.ejs", { chat });
});

// Error handling middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Some error occured" } = err;
    res.status(status).send(message);
});

// const chat1 = new Chat({
//     from: "ruturaj",
//     to: "Sakshi",
//     msg: "Hi, How are you?",
//     created_at: new Date()
// });

// chat1.save().then((res) => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })


const port = 8080;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});