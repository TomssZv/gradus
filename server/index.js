const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const dotenv = require('dotenv') // .env file
dotenv.config()
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(cors())

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB
})


app.get('/', (req, res) => {
    db.query("select * from users", (error, result, field) => {
        if (error) {
            console.log(error)
        }
        res.json(result)
    })
})

app.post('/register', (req, res) => {
    res.send('works')
    console.log(req.body)
    res.end()
})

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})
