
//call controller to route

const customerController = require("../controllers/customer.controller")



// function customer(){}

// arrow function
const customer = (app) => {
    app.get("/", customerController.getList)
    app.get("/:id", customerController.getOne)
    app.post("/", customerController.create)
    app.put("/", customerController.update)
    app.delete("/:id", customerController.remove)
}

module.exports = customer




