const db = require("../config/db.config")
const { isEmptyorNull } = require("../util/service")

const getList = (req, res) => {
    var sqlSelect = "SELECT * FROM category"
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
    var sqlSelect = "SELECT * FROM category WHERE category_id = ?"
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
    var body = req.body
    var { name, description, parent_id, image, order_number, create_at } = req.body
    var message = {}
    if (isEmptyorNull(name)) {
        message.name = "Please fill in category name"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return
    }
    var sqlInsert = "INSERT INTO `category`(`name`, `description`, `parent_id`, `image`, `create_at`, `create_by`) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert, [name, description, parent_id, image, order_number, create_at], (error, rows) => {
        if (error) {
            res.json({
                error: true,
                message: error
            })
        } else {
            res.json({
                message: "Category insert successfully!"
            })
        }
    })

}
const update = (req, res) => {
    var body = req.body
    var { category_id, name, description, parent_id, image, order_number, create_at } = req.body
    var message = {}
    if (isEmptyorNull(category_id)) {
        message.category_id = "Parameters is required"
    }
    if (isEmptyorNull(name)) {
        message.name = "Please fill in category name"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return
    }
    var sqlInsert = "UPDATE `category` SET `name`=?, `description`=?, `parent_id`=?, `image`=? WHERE category_id =?"
    db.query(sqlInsert, [name, description, parent_id, image, category_id], (error, rows) => {
        if (error) {
            res.json({
                error: true,
                message: error
            })
        } else {
            res.json({
                message: "Category update successfully!"
            })
        }
    })
}
const remove = (req, res) => {
    var { id } = req.params
    db.query("DELETE FROM category WHERE category_id =?", [id], (error, rows) => {
        if (!error) {
            res.json({
                message: "Category delete successfully!"
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