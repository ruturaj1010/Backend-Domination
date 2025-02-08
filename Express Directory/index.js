const express = require("express");

const app = express();

// console.dir(app);

let port = 3000;

app.listen(port, () => {
    console.log(`app is listeining on ${port}`);
});


// app.use((req , res)=> {
//     // console.log(req)
//     console.log("Request has received" )
    
//     // sending response from server

//     // res.send("This is a basic reponse");

//     // res.send({
//     //     name : "Ruturaj",
//     //     college : "DYPCET"
//     // })

//     let code = "<h1>Fruits</h1> <ul><li>Apple</li><li>Orange</li></ul>";
//     res.send(code)
// })

app.get("/", (req, res)=> {
    res.send("I am on the root path");
})

// app.get("/apple", (req, res)=> {
//     res.send("I am on the apple path");
// })

// app.get("/orange", (req, res)=> {
//     res.send("I am on the orange path");
// })

// app.get("*", (req, res)=> {
//     res.send("This path doesnot exist");
// })

app.get("/:username/:id", (req, res)=>{
    let { username, id } = req.params;
    let htmlcode =`<h1>your account @${username} has been activated</h1>`
    res.send(htmlcode)
}) 


app.get("/search", (req, res)=>{
    let {q} = req.query;

    if(!q) {
        res.send("nothing searched query")
    }
    res.send(`This is a serach query ${q}`);
})