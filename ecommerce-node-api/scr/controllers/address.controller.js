const db = require("../config/db.config")
const { isEmptyorNull } = require("../util/service")

const getList = (req, res) => {
    var sqlSelect = "SELECT * FROM address"
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
    var sqlSelect = "SELECT * FROM address WHERE address_id = ?"
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
    var { customer_id, province_id, firstname, lastname, tel, email, address_des, create_at } = req.body
    var message = {}
    if (isEmptyorNull(customer_id)) {
        message.customer_id = "Parameter customer_id is required"
    }
    if (isEmptyorNull(province_id)) {
        message.province_id = "Parameter province_id is required"
    }
    if (isEmptyorNull(firstname)) {
        message.firstname = "Please fill in firstname"
    }
    if (isEmptyorNull(lastname)) {
        message.lastname = "Please fill in lastname"
    }
    if (isEmptyorNull(tel)) {
        message.tel = "Please fill in tel"
    }
    if (isEmptyorNull(address_des)) {
        message.address_des = "Please fill in address_des"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return
    }
    var sqlInsert = "INSERT INTO `address` (`customer_id`, `province_id`, `firstname`, `lastname`, `tel`, `email`, `address_des`, `create_at`) VALUES (?,?,?,?,?,?,?,?)"
    db.query(sqlInsert, [customer_id, province_id, firstname, lastname, tel, email, address_des, create_at], (error, rows) => {
        if (error) {
            res.json({
                error: true,
                message: error
            })
        } else {
            res.json({
                message: "address insert successfully!"
            })
        }
    })

}
const update = (req, res) => {
    var body = req.body
    var { address_id, customer_id, province_id, firstname, lastname, tel, email, address_des, create_at } = req.body
    var message = {}
    if (isEmptyorNull(address_id)) {
        message.address_id = "Parameters is required"
    }
    if (isEmptyorNull(address_des)) {
        message.address_des = "Please fill in address_des name"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return
    }
    var sqlInsert = "UPDATE `address` SET `customer_id` =?, `province_id`=?, `firstname`=?, `lastname`=?, `tel`=?, `email`=?, `address_des`=? WHERE address_id =?"
    db.query(sqlInsert, [customer_id, province_id, firstname, lastname, tel, email, address_des, address_id], (error, rows) => {
        if (error) {
            res.json({
                error: true,
                message: error
            })
        } else {
            res.json({
                message: "address update successfully!"
            })
        }
    })
}
const remove = (req, res) => {
    var { id } = req.params
    db.query("DELETE FROM address WHERE address_id =?", [id], (error, rows) => {
        if (!error) {
            res.json({
                message: "address delete successfully!"
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