const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const authenticate = require('../middleware/authenticate')
const router = express.Router()
require('../db/conn')
const User = require('../model/userSchema')
const cookieParser = require('cookie-parser')
router.get('/', (req, res) => {
    res.send('Welcome to the Router Part')
})
router.use(cookieParser())

///*--------Register Async-Await*---------///////
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: 'Please fill all the details!' })
    }
    else if (password != cpassword) {
        return res.status(422).json({ error: 'Please confirm password' })
    }
    try {
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return res.status(422).json({ error: 'Email Already exists' })
        }
        const user = new User({ name, email, phone, work, password, cpassword })
        const userRegistered = await user.save()
        res.status(201).json({ message: "User Registered Sucessfully!" + userRegistered })
    }
    catch (e) {
        res.status(400).json({ error: e })
    }

})

//-----------LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send("Please Fill the details")
        }
        const userLogin = await User.findOne({ email: email })
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            const token = await userLogin.generateAuthToken()
            //res.cookie("nameof_cookie",Value of Cookie,{ expires:--,http:--})
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 50000),
                httpOnly: true
            })
            if (isMatch) {
                res.status(200).json({ "Sucess": "User Logged IN!" })
            }
            else {
                res.status(400).json({ "Error": "Invalid Credentials" })
            }
        }
        else {
            res.status(400).json({ "Error": "Invalid Credentials" })
        }
    }
    catch (e) {
        console.log(e)
    }
})

router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser)
})

//get user data for contactus form and homepage

router.get('/getdata', authenticate, async (req, res) => {
    res.send(req.rootUser)
    console.log('ContactUS form ')
})

router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body
        console.log(req.body)
        if (!name || !email || !phone || !message) {
            console.log("Provide all fields to send Message")
            return res.json({ error: "Provide all fields" })
        }
        const userContact = await User.findOne({ _id: req.userID })
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message)
            await userContact.save()
            res.status(201).json({ message: "Sucess message sent" })
        }

    } catch (e) {
        console.log(e)
    }
})


//logout

router.get('/logout', (req, res) => {
    console.log('Logged out!!')
    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).send("User Logged OUT")
})

module.exports = router