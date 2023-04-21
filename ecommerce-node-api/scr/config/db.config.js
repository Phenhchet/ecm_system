const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecm_backend"
})
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log("Connect DB Sucessfully")
});


module.exports = db
