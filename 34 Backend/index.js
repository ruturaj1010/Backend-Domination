const express =  require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id : uuidv4(),
        username :"ruturaj1010",
        content : "Love to code more and more!"
    },
    {
        id : uuidv4(),
        username :"sakshi0208",
        content : "Love Cooking!"
    },
    {
        id : uuidv4(),
        username :"sunita1204",
        content : "Unwavering love for fashion designing!"
    }
]

app.get("/posts", (req, res)=>{
    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req, res)=>{
    res.render("form.ejs")
})

app.post("/posts", (req, res)=>{
    // console.log(req.body);
    let { username, content } =  req.body;
    let id = uuidv4();
    posts.push({ id, username , content})
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res)=>{
    const { id } = req.params;
    const post = posts.find(post => id === post.id);
    console.log(post)

    // res.send(`Your id is ${id}`);
    res.render("show.ejs", { post })
})

app.listen(port , ()=>{
    console.log(`Server is listening on port : ${port}`);
})