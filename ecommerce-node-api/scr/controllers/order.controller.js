const db = require("../config/db.config")


const getList = (req, res) => {
    res.json({
        list: "getlist"
    })
}
const getOne = (req, res) => { }
const create = (req, res) => { }
const update = (req, res) => { }
const remove = (req, res) => { }

module.exports = {
    getList,
    getOne,
    create,
    update,
    remove
}