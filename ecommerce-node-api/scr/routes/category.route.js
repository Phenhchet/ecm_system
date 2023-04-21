const contrl = require("../controllers/category.controller")

const category = (app) => {
    app.get("/api/category/get-list", contrl.getList)
    app.get("/api/category/get-one/:id", contrl.getOne)
    app.post("/api/category/create", contrl.create)
    app.put("/api/category/update", contrl.update)
    app.delete("/api/category/remove/:id", contrl.remove)
}

module.exports = category