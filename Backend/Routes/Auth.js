const express = require('express')
const bcryptjs = require('bcryptjs')
const router = express.Router()
const User = require('../Models/User')
const { check, validationResult } = require('express-validator');
const Middleware = require('../Middleware/GetUserDetails')
const JWT_Secure = require('jsonwebtoken')
const JWT_Str = "SaadIsHere"

// --------------------------------------------------------------------------------------------------------
// ROUTE 1
// User to create
router.post('/create', [
    check('email', 'Please! Enter a Valid email').isEmail(),
    check('Firstname', 'Please! Enter a Valid Firstname').isLength({ min: 3 }),
    check('Lastname', 'Please! Enter a Valid Lastname').isLength({ min: 3 })
], async (req, res) => {
    let success = false
    console.log(req.body)

    // errs and sending Bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // Now we are going to secure the PASSWORD by Salt and Pepper
    const salt = await bcryptjs.genSalt(10);
    let secPass = await bcryptjs.hash(req.body.Password, salt)

    // Creating User and also check the user with eamail exists already?
    try {
        let user = await User.findOne({ email: req.body.email })
        console.log(user)
        if (user) {
            return res.status(400).json({ success, error: "Sorry, This email is already exist" })
        }
        user = await User.create({
            Firstname: req.body.Firstname,
            Lastname: req.body.Lastname,
            email: req.body.email,
            Password: secPass
        })

        // Buildings Tokens with signs
        const data = {
            user: {
                id: user.id
            }
        }
        const JWT_DataToken = JWT_Secure.sign(data, JWT_Str)
        console.error(JWT_DataToken)
        let success = true
        res.json({ success, JWT_DataToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Somehing Happened")
    }
})

// --------------------------------------------------------------------------------------------------------
// ROUTE 2
// User to login
router.post('/login', [
    check('email', 'Please! Enter a Valid email').isEmail(),
    check('Password', 'Password cannot be blanked').exists(),
], async (req, res) => {
    let success = false;
    console.log(req.body)

    // errs and sending Bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, Password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct E credentials" })
        }

        let userPassword = await User.findOne({ Password })
        if (!userPassword) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }
        // const passwordCorrect = await bcryptjs.compare(Password, user.Password)
        // if (!passwordCorrect) {
        //     return res.status(400).json({ success, error: "Please try to login with correct P credentials" })
        // }

        const data = {
            user: {
                id: user.id
            }
        }
        const JWT_DataToken = JWT_Secure.sign(data, JWT_Str)
        console.error(JWT_DataToken)
        success = true
        res.json({ success, JWT_DataToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Login error occured]")
    }
})

// --------------------------------------------------------------------------------------------------------
// ROUTE 3
// Getting details of Logged in User
router.post('/getdetails', Middleware, async (req, res) => {
    console.log(req.body)

    // errs and sending Bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        userID = req.user.id
        const user = await User.findById(userID).select("-Password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Login error occured]")
    }
})


module.exports = router