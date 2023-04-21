const contrl = require("../controllers/wishlist.controller")

const wishlist = (app) => {
    app.get("/api/wishlist/get-list", contrl.getList)
    app.get("/api/wishlist/get-one", contrl.getOne)
    app.post("/api/wishlist/create", contrl.create)
    app.put("/api/wishlist/update", contrl.update)
    app.delete("/api/wishlist/remove", contrl.remove)
}

module.exports = wishlist