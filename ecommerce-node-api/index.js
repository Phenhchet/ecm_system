const express = require("express")
const mysql = require("mysql")
const cors = require("cors")



const app = express()


//allow body json 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//allow front-end to get data from back-end
app.use(cors({
    origin: "*"
}))

//request to access customer.route.js
require("./scr/routes/customer.route")(app)
require("./scr/routes/user.route")(app)
require("./scr/routes/category.route")(app)
require("./scr/routes/address.route")(app)
require("./scr/routes/cart.route")(app)
require("./scr/routes/order.route")(app)
require("./scr/routes/product.route")(app)
require("./scr/routes/wishlist.route")(app)








// app.get("/api/customer", (req, res) => {
//     db.query("SELECT * FROM customers", (err, result) => {
//         res.json({
//             list: result
//         })
//     })
// })




// craete port
const port = 8080

//push 
app.listen(port, () => {
    console.log("running http://localhost:" + port)
})
