const contrl = require("../controllers/cart.controller")

const cart = (app) => {
    app.get("/api/cart/get-list", contrl.getList)
    app.get("/api/cart/get-one", contrl.getOne)
    app.get("/api/cart/by-customer/:id", contrl.getCardByCustomer)
    app.post("/api/cart/create", contrl.create)
    app.put("/api/cart/update", contrl.update)
    app.delete("/api/cart/remove", contrl.remove)
}

module.exports = cart