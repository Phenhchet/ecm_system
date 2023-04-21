const db = require("../config/db.config")
const { isEmptyorNull } = require("../util/service")

const getList = (req, res) => {
    var sqlSelect = "SELECT * FROM cart"
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
    var sqlSelect = "SELECT * FROM cart WHERE cart_id = ?"
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
const getCardByCustomer = (req, res) => {
    var { id } = req.params
    var sqlSelect = "SELECT FROM card WHERE customer_id = ?"
    var paramSql = [id]
    db.query(sqlSelect[paramSql], (error, rows) => {
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
    var { customer_id, product_id, quantity, create_at } = req.body
    var message = {}
    if (isEmptyorNull(customer_id)) {
        message.customer_id = "Parameter customer_id is required"
    }
    if (isEmptyorNull(product_id)) {
        message.product_id = "Parameter product_id is required"
    }
    if (isEmptyorNull(quantity)) {
        message.quantity = "Please fill in quantity"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return
    }
    var sqlInsert = "INSERT INTO `cart` (`customer_id`, `product_id`, `quantity`, `create_at`) VALUES (?,?,?,?)"
    db.query(sqlInsert, [customer_id, product_id, quantity, create_at], (error, rows) => {
        if (error) {
            res.json({
                error: true,
                message: error
            })
        } else {
            res.json({
                message: "cart insert successfully!"
            })
        }
    })

}
const update = (req, res) => {
    var body = req.body
    var { cart_id, customer_id, product_id, quantity } = req.body
    var message = {}
    if (isEmptyorNull(cart_id)) {
        message.cart_id = "Please fill in card_id"
    }
    if (isEmptyorNull(customer_id)) {
        message.customer_id = "Please fill in customer_id"
    }
    if (isEmptyorNull(product_id)) {
        message.product_id = "Please fill in product_id"
    }
    if (isEmptyorNull(quantity)) {
        message.quantity = "Please fill in quantity"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return
    }
    var sqlInsert = "UPDATE `cart` SET `customer_id`=?, `product_id`=?, `quantity`=? WHERE cart_id =?"
    db.query(sqlInsert, [customer_id, product_id, quantity, cart_id], (error, rows) => {
        if (error) {
            res.json({
                error: true,
                message: error
            })
        } else {
            res.json({
                message: "cart update successfully!"
            })
        }
    })
}
const remove = (req, res) => {
    var { id } = req.params
    db.query("DELETE FROM cart WHERE cart_id =?", [id], (error, rows) => {
        if (!error) {
            res.json({
                message: "cart delete successfully!"
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
    getCardByCustomer
}