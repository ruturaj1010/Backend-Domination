const express = require("express")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = 8080;

app.get("/register", (req, res)=>{
    let {user, password} = req.query;
    res.send(`This is standard GET response. Welcome ${user}`);
})

app.post("/register", (req, res)=>{
    // console.log(req.body)
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    let { user, password } = req.body;
    res.send(`This is standard POST response. Welcome ${user}`);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})