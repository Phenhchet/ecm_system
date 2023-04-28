const contrl = require("../controllers/category.controller")

const category = (app) => {
    app.get("/", contrl.getList)
    app.get("/:id", contrl.getOne)
    app.post("/", contrl.create)
    app.put("/", contrl.update)
    app.delete("/:id", contrl.remove)
}

module.exports = category