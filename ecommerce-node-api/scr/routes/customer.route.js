
//call controller to route

const customerController = require("../controllers/customer.controller")



// function customer(){}

// arrow function
const customer = (app) => {
    app.get("/api/customer/getList", customerController.getList)
    app.post("/api/customer/create", customerController.create)
    app.put("/api/customer/update", customerController.update)
    app.delete("/api/customer/remove/:id", customerController.remove)
}

module.exports = customer




