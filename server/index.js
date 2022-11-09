const express = require('express');
const mysql = require('mysql')
const dotenv = require('dotenv') // .env file
dotenv.config()


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
})


const app = express();

app.get('/', (req, res) => {
    db.query("select * from users", (error, result, field) => {
        if (error) throw error
        res.json(result)
    })
})

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})
