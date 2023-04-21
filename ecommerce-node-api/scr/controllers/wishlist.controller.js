const db = require("../config/db.config")
const { isEmptyorNull } = require("../util/service")

const getList = (req, res) => {
    var sqlSelect = "SELECT * FROM wishlist"
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
    var sqlSelect = "SELECT * FROM wishlist WHERE wishlist_id = ?"
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
    var { customer_id, product_id, create_at } = req.body
    var message = {}
    if (isEmptyorNull(customer_id)) {
        message.customer_id = "Parameter customer_id is required"
    }
    if (isEmptyorNull(product_id)) {
        message.product_id = "Parameter product_id is required"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return
    }
    var sqlInsert = "INSERT INTO `wishlist` (`customer_id`, `product_id`, `create_at`) VALUES (?,?,?)"
    db.query(sqlInsert, [customer_id, product_id, create_at], (error, rows) => {
        if (error) {
            res.json({
                error: true,
                message: error
            })
        } else {
            res.json({
                message: "wishlist insert successfully!"
            })
        }
    })

}
const update = (req, res) => {
    var body = req.body
    var { wishlist_id, customer_id, product_id } = req.body
    var message = {}
    if (isEmptyorNull(wishlist_id)) {
        message.wishlist_id = "Please fill in card_id"
    }
    if (isEmptyorNull(customer_id)) {
        message.customer_id = "Please fill in customer_id"
    }
    if (isEmptyorNull(product_id)) {
        message.product_id = "Please fill in product_id"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return
    }
    var sqlInsert = "UPDATE `wishlist` SET `customer_id`=?, `product_id`=? WHERE wishlist_id =?"
    db.query(sqlInsert, [customer_id, product_id, wishlist_id], (error, rows) => {
        if (error) {
            res.json({
                error: true,
                message: error
            })
        } else {
            res.json({
                message: "wishlist update successfully!"
            })
        }
    })
}
const remove = (req, res) => {
    var { id } = req.params
    db.query("DELETE FROM wishlist WHERE wishlist_id =?", [id], (error, rows) => {
        if (!error) {
            res.json({
                message: "wishlist delete successfully!"
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
    remove,
}