const db = require("../config/db.config")
const { isEmptyorNull } = require("../util/service")

const getList = (req, res) => {
    var sqlSelect = "SELECT * FROM product"
    db.query(sqlSelect, (error, rows) => {
        if (!error) {
            res.json({
                list: rows
            })
        } else {
            res.json({
                error: true,
                message: error
            })
        }
    })
}
const getOne = (req, res) => {
    var sqlSelect = "SELECT * FROM product WHERE product_id = ?"
    var { id } = req.params
    if (isEmptyorNull(id)) {
        res.json({
            error: true,
            message: {
                id: "Please fill in Params id"
            }
        })
    }
    db.query(sqlSelect, [id], (error, rows) => {
        if (!error) {
            res.json({
                list: rows
            })
        } else {
            res.json({
                error: true,
                message: error
            })
        }
    })
}
const create = (req, res) => {
    var { province_id, category_id, name, barcode, price, quantity, image, description, status, create_at, create_by } = req.body
    var message = {}
    if (isEmptyorNull(province_id)) {
        message.province_id = "Parameter province_id is required"
    }
    if (isEmptyorNull(category_id)) {
        message.category_id = "Parameter category_id is required"
    }
    if (isEmptyorNull(name)) {
        message.name = "Please fill in name"
    }
    if (isEmptyorNull(barcode)) {
        message.barcode = "Please fill in barcode"
    }
    if (isEmptyorNull(price)) {
        message.price = "Please fill in price"
    }
    if (isEmptyorNull(quantity)) {
        message.quantity = "Please fill in quantity"
    }
    if (isEmptyorNull(status)) {
        message.status = "Please fill in status"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return
    }
    var sqlInsert = "INSERT INTO `product` (`category_id`, `name`,`barcode`, `price`, `quantity`, `image`, `description`, `status`, `create_at`, `create_by`) VALUES (?,?,?,?,?,?,?,?,?,?)"
    db.query(sqlInsert, [province_id, category_id, name, barcode, price, quantity, image, description, status, create_at, create_by], (error, rows) => {
        if (error) {
            res.json({
                error: true,
                message: error
            })
        } else {
            res.json({
                message: "product insert successfully!"
            })
        }
    })

}
const update = (req, res) => {
    var body = req.body
    var { province_id, category_id, name, barcode, price, quantity, image, description, status, create_at, create_by } = req.body
    var message = {}
    if (isEmptyorNull(product_id)) {
        message.product_id = "Parameters is required"
    }
    if (isEmptyorNull(product_des)) {
        message.product_des = "Please fill in product_des name"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return
    }
    var sqlInsert = "UPDATE `product` SET `category_id`=?, `name`=?,`barcode`=?, `price`=?, `quantity`=?, `image`=?, `description`=?, `status`=? WHERE product_id =?"
    db.query(sqlInsert, [category_id, name, barcode, price, quantity, image, description, status, province_id], (error, rows) => {
        if (error) {
            res.json({
                error: true,
                message: error
            })
        } else {
            res.json({
                message: "product update successfully!"
            })
        }
    })
}
const remove = (req, res) => {
    var { id } = req.params
    db.query("DELETE FROM product WHERE product_id =?", [id], (error, rows) => {
        if (!error) {
            res.json({
                message: "product delete successfully!"
            })
        } else {
            res.json({
                error: true,
                message: error
            })
        }
    })
}

module.exports = {
    getList,
    getOne,
    create,
    update,
    remove
}