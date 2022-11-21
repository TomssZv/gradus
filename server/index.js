const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const dotenv = require('dotenv') // .env file
const bcrypt = require('bcrypt')
const {createTokens, validateToken} = require('./JWT')
const cookieParser = require('cookie-parser')

const saltRounds = 10;

dotenv.config()
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(cookieParser())

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res) => {
    res.send('hello')
})

// login handler
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // gets hash
    // console.log(user)
    db.query(`select * from users where email = '${email}'`, (err, result, fields) =>{
        if (result.length !== 1) {
            return res.status(401).send('Wrong email or password')
        } else {
            const user = {
                userId: result[0].ID,
                first_name: result[0].first_name,
                last_name: result[0].last_name
            }
            // compares hashes
            bcrypt.compare(password, result[0].password).then(function(result) {
                const accessToken = createTokens(user)
                res.cookie('access-token', accessToken, {
                    maxAge: 60*60*1000,
                    SameSite: 'None',
                    httpOnly: true,
                })
                return res.send('LOGGED IN!')
            })
            .catch(err => {
                // return res.status(406).json({message: 'Invalid email or password'})
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
    console.log(req.body.name)
    if (password === confirmPassword) {
        const user = {username: username}
        createRefreshTokens(user)
        db.query(`insert into users (first_name, last_name, email, username, password, refresh) values ('${name}', '${surname}', '${email}', '${username}', '${hash}')`, (err, result) => {
            if (!err) {
                return res.send("User registered!")
            } else 
            return res.send(err)
        })
    } else {
        return res.send("Passwords don't match")
    }
})

app.get('/profile',validateToken, (req, res) => {
    console.log(req.user)
    res.send('in')
})

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})
