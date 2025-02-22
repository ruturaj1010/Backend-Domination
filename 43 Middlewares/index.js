const express = require("express");
const app = express();
const ExpressError = require("./ExpressError.js");

// app.use((req, res) => {
//     console.log("I am a middleware");
//     res.send("This is a middleware");
// })


app.use("/api" , (req , res , next)=>{
    let { token } = req.query;
    if(token === "giveaccess"){
        next();
    }
    // res.send("request Denied");
    throw new ExpressError(401 , "ACCESS DENIED");
})

app.get("/api", (req , res)=>{
    res.send("Data");
})

app.get("/err", (req , res)=>{
    abcd = abcd;
})

app.use((err , req ,res , next)=>{
   let { status = 500 , message = "Access Denied"} = err;
   res.status(status).send(message);
})

app.get("/", (req, res) => {
    console.log("This is root.")
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})