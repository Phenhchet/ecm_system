- init node
> nm int
- create file index.js

* Install express
- npm install express



const express = require("express")

const app = express()

// handle route / (home)
app.get("/", (req, res) => {
    res.send("Hell NodeJs")
})

// Handle rout /about
app.get("/about", (req, res) => {
    res.send("You have queesst about route")
})

// Handle rout /product/create
app.get("/product/create", (req, res) => {
    var data = [
        {
            id: 101,
            name: "Coca",
            qty: 1,
            Price: 10
        },
        {
            id: 102,
            name: "Pepsy",
            qty: 1,
            Price: 20
        },
    ]
    res.send(data)
})

// craete port
const port = 8080

//push 
app.listen(port, () => {
    console.log("running http://localhost:" + port)
})


* we should create controllers file and route file to controll code

*if you want to create mutiple function
 module.exports = customer ={
    customer,
     ...
 }



*install nodemon
- npm i nodemon