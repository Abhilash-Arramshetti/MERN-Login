const dotenv = require('dotenv')
const express = require('express')
const app = express()

dotenv.config({ path: __dirname + '/config.env' })
require('./db/conn')

app.use(express.json())
// const User = require('./model/userSchema')

//linking the router files to route easily
app.use(require('./router/auth'))

const PORT = process.env.PORT || 8000

// app.get('/about',(req, res) => {
//     res.send('Hello Admin from About Page')
// })
// app.get('/contact', (req, res) => {
//     res.send('Hello Admin from Contact Page')
// })
app.get('/signup', (req, res) => {
    res.send('Hello Admin from SignUP Page')
})

//heroku
if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'))
}

app.listen(PORT, (e) => {
    try {
        console.log(`Listening at port ${PORT}`)
    }
    catch (e) {
        console.log(e)
    }
})