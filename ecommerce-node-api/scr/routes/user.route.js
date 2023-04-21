const multer = require("multer")
// const image_path = "file:///C:/xampp/htdocs/image_path/ecm_backend_g1/"
const image_path = "C:/xampp/htdocs/image_path/ecm_backend_g1/"
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, image_path)
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    }
})
//how to store image



//call controller to route

const userController = require("../controllers/user.controller")


const user = (app) => {
    app.get("/api/user/getUser", userController.getUser)
    app.get("/api/user/get-cart", userController.getCart)

    app.post("/api/user/create", upload.single("myfile"), userController.create)
    app.post("/api/user/login", userController.login)
    // app.post("/api/user/upload-image", upload.single("myfile"), userController.UploadImage)

    app.put("/api/user/update", userController.update)
    app.delete("/api/user/remove/:id", userController.remove)
}

module.exports = user