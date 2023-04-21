const db = require("../config/db.config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret_access_token = "EIT848al4774947&$^3#JHTLUJE"

var dataCarts = [
    {
        id: 101,
        name: "Phenhchet",
        color: "red",
        user_id: 14
    },
    {
        id: 102,
        name: "Phearom",
        color: "blue",
        user_id: 2
    },
    {
        id: 104,
        name: "Computer",
        color: "red",
        user_id: 14
    }
]

//create function
const getUser = (req, res) => {
    var mysql = "SELECT * FROM users"
    mysql += " ORDER BY user_id DESC"
    db.query(mysql, (error, rows) => {
        if (error) {
            res.json({
                error: tr,
                message: error
            })
        } else {
            res.json({
                user_list: rows
            })
        }
    })
}

const getCart = (req, res) => {
    var authorization = req.headers.authorization;
    var token_from_clien = null

    if (authorization != null && authorization != "") {
        token_from_clien = authorization.split(" ")
        token_from_clien = token_from_clien[1]
    }
    if (token_from_clien == null) {
        res.json({
            error: true,
            message: "You have permission access this method!"
        })
    } else {
        jwt.verify(token_from_clien, secret_access_token, (err, data) => {
            if (err) {
                res.json({
                    error: true,
                    message: "Invalid token!"
                })
            } else {
                var user_id = data.profile.user_id
                // dataCarts = []
                // "SELEC * FROM carts where users = user_id"
                var cart = dataCarts.filter((item, index) => item.user_id == user_id)
                res.json({
                    cart: cart
                })
            }
        })
    }
}

const UploadImage = (req, res) => {

    res.json({
        data: req.body,
        file: req.file
    })

}


const create = (req, res) => {
    // ----------------------just testing bcrypt password -----------------------------------

    // var password = "12345"
    // var bcrypt_password = bcrypt.hashSync(password, 10)

    // //compare password
    // var paramPassword = "12345"
    // var isCorrect = bcrypt.compareSync(paramPassword, bcrypt_password)


    // res.json({
    //     password: password,
    //     bcrypt_password: bcrypt_password,
    //     isCorrect: isCorrect
    // })
    // return

    // ----------------------just testing bcrypt password -----------------------------------

    //get paramater from clien side

    var body = req.body
    if (body.firstname == null || body.firstname == "") {
        res.json({
            error: true,
            message: "Please fill in firstname"
        })
        return false
    }
    if (body.lastname == null || body.lastname == "") {
        res.json({
            error: true,
            message: "Please fill in lastname"
        })
        return false
    }

    if (body.username == null || body.username == "") {
        res.json({
            error: true,
            message: "Please fill in username"
        })
        return false
    } else {
        // username  is email or tel 
        // ifEmail username store in column email
        // ifTel username store in column tel
    }

    if (body.password == null || body.password == "") {
        res.json({
            error: true,
            message: "Please fill in password"
        })
        return false
    }
    var image = null
    if (req.file) {
        image = req.file.filename
    }


    //check username have or not. if not will create, if have will not create

    db.query("SELECT * FROM users WHERE email = ?", [body.username], (err, result) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else if (result.length == 0) {
            //can create account
            var password = bcrypt.hashSync(body.password, 10)
            var sqlInsert = "INSERT INTO users (firstname, lastname, gender, dob, email, password, profile, is_active) VALUES (?,?,?,?,?,?,?,?)"

            db.query(sqlInsert, [body.firstname, body.lastname, body.gender, body.dob, body.username, password, image, body.is_active], (error, rows) => {
                if (error) {
                    res.json({
                        error: true,
                        message: error
                    })
                } else {
                    res.json({
                        message: "User inserted!",
                        data: rows
                    })
                }
            })
        } else {
            res.json({
                error: true,
                message: "Account already exist!"
            })
        }
    })


}



const login = (req, res) => {
    // var username = req.body.username
    // var password = req.body.password
    var { username, password } = req.body;
    if (username == null || username == "") {
        res.json({
            error: true,
            message: "Please fill in username!"
        })
        return
    } else if (password == null || password == "") {
        res.json({
            error: true,
            message: "Please fill in password!"
        })
        return
    }

    db.query("SELECT * FROM users WHERE email = ?", [username], (err, result) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            if (result.length == 0) {
                res.json({
                    error: true,
                    message: "User dose not exist. Please register!"
                })
            } else {
                var data = result[0]
                var passwordInDb = data.password;
                var isCorrectPassword = bcrypt.compareSync(password, passwordInDb) // true/false
                // true/false
                if (isCorrectPassword) {
                    delete data.password;
                    data.username = data.email //asign username for user
                    var token = jwt.sign({ profile: data }, secret_access_token)
                    //profile: data  == data = result[0]
                    //"Ph@2023!@#" is a generate token
                    res.json({
                        is_login: true,
                        message: "Login success!",
                        profile: data,
                        token: token
                    })
                } else {
                    res.json({
                        message: "Incorrect password!"
                    })
                }
            }
        }
    })

}

const update = (req, res) => {
    var body = req.body
    if (body.firstname == null || body.firstname == "") {
        res.json({
            error: true,
            message: "Please fill in firstname"
        })
        return false
    }
    if (body.lastname == null || body.lastname == "") {
        res.json({
            error: true,
            message: "Please fill in lastname"
        })
        return false
    }
    var sqlUpdate = "UPDATE users SET firstname=?, lastname=?, gender=?, dob=?, tel=?, email=?, is_active=? WHERE user_id =?"
    db.query(sqlUpdate, [body.firstname, body.lastname, body.gender, body.dob, body.tel, body.email, body.is_active, body.user_id], (error, rows) => {
        if (error) {
            res.json({
                error: true,
                message: error
            })
        } else {
            res.json({
                message: "User updated!",
                data: rows
            })
        }
    })
}

const remove = (req, res) => {
    db.query("DELETE FROM users WHERE user_id = " + req.params.id, (error, rows) => {
        if (error) {
            res.json({
                error: true,
                message: error
            })
        } else {
            if (rows.affectedRows != 0) {
                res.json({
                    message: "User deleted!",
                    data: rows
                })
            } else {
                res.json({
                    message: "Delete not complete. User not found"
                })
            }


        }

    })
}

module.exports = {
    getUser,
    create,
    update,
    remove,
    login,
    getCart,
    UploadImage
}