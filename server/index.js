const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const dotenv = require('dotenv') // .env file
dotenv.config()
const app = express();

app.use(cors())

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res) => {
    db.query("select * from users", (error, result, field) => {
        if (error) {
            console.log(error)
        }
        res.json(result)
    })
})


app.post('/register', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (password === confirmPassword) {
        return res.json()
    } else {
        return res.send("Passwords don't match")
    }
})

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})
