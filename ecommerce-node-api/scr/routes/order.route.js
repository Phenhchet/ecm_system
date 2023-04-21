const contrl = require("../controllers/order.controller")

const order = (app) => {
    app.get("/api/order/get-list", contrl.getList)
    app.get("/api/order/get-one", contrl.getOne)
    app.post("/api/order/create", contrl.create)
    app.put("/api/order/update", contrl.update)
    app.delete("/api/order/remove", contrl.remove)
}

module.exports = order