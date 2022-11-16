const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const dotenv = require('dotenv') // .env file
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10;

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
    
})

// login handler
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // gets hash
    db.query(`select * from users where email = '${email}'`, (err, result) =>{
        if (err) {
            return res.send(err)
        } else {
            // return res.send(result[0].password)
            let userId = {userId: result[0].ID}
            // compares hashes
            bcrypt.compare(password, result[0].password).then(function(result) {
                return res.json(jwt.sign(userId, process.env.JWT_SECRET, { expiresIn: 60 * 60 }));
            })
            .catch(err => {
                // return res.send(err)
            })
        }
    })
})

app.post('/register', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    const confirmPassword = req.body.confirmPassword;
    if (password === confirmPassword) {
        db.query(`insert into users (first_name, last_name, email, username, password) values ('${name}', '${surname}', '${email}', '${username}', '${hash}')`, (err, result) => {
            if (!err) {
                return res.send("User registered!")
            } else 
            return res.send(err)
        })
    } else {
        return res.send("Passwords don't match")
    }
})


app.listen(5000, () => {
    console.log('Server listening on port 5000')
})
