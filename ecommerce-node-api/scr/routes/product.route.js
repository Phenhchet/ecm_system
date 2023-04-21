const contrl = require("../controllers/order.controller")

const product = (app) => {
    app.get("/api/product/get-list", contrl.getList)
    app.get("/api/product/get-one", contrl.getOne)
    app.post("/api/product/create", contrl.create)
    app.put("/api/product/update", contrl.update)
    app.delete("/api/product/remove", contrl.remove)
}

module.exports = product