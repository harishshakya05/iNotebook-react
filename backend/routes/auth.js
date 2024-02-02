const express = require("express");
const router = express.Router();
const User = require("../models/User")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'JWT_TOKEN';
const { body, validationResult } = require('express-validator');

const fetchuser = require("../middleware/fetchuser");

// 1. create a user using :POST "/api/auth/sigup". No login reuqired
router.post("/signup", [
    body('name', 'enter valid name').trim().isLength({ min: 3 }),
    body('email', 'enter valid email').isEmail(),
    body('password', 'enter valid password').isLength({ min: 5 }),
], async (req, res) => {
    const result = validationResult(req);
    let status = false;
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ status, error: "sorry user with same email already exists" })
        }
        const securePassword = await bcrypt.hash(req.body.password, saltRounds);
        console.log(securePassword);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        })
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        status = true;
        res.json({ status, token });
    } catch (error) {
        return res.status(500).json({ status, error: "some error occured" })
    }
})

// 2. Login user using :POST "/api/auth/login". No login reuqired
router.post('/login', [
    body('email', 'enter valid email').isEmail(),
    body('password', 'enter valid password').isLength({ min: 5 }),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        let status = false;
        if (!user) {
            return res.status(400).json({ status, error: "Please try to login with correct credential." })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ status, error: "Please try to login with correct credential111111." })
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        status = true;
        res.json({ status, token });
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
})

// 3. Get loggedin user details using : GET "/api/auth/getuser". login reuqired
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const id = req.user;
        const user = await User.findById(id);
        res.json(user)
    } catch (error) {
        return res.status(500).send("Internal server error")
    }

})
module.exports = router;