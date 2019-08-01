require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./authController')

const app = express()

const {SESSION_SECRET, CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected! yay!')
})

const SERVER_PORT = 4001

// TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
})
)

// ENDPOINTS
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)


app.listen(SERVER_PORT, () => console.log(`Feed me ${SERVER_PORT} bowls of ramen!`))