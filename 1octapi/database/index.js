var mysql = require('mysql')

const db = mysql.createConnection({
    user:"root",
    password: "12345678",
    database:'1oct',
    host:'localhost'
})

module.exports = db
