const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashpassword
        })
        const savedUser = await newUser.save()
        res.json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !staff && res.status(400).json('wrong credentials')

        const originalPassword = await bcrypt.compare(req.body.password, user.password)
        !originalPassword && res.status(422).json('incorrect password')

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            { expiresIn: '24h' }
        )
        const { password, ...others } = user._doc
        res.status(200).json({ ...others, accessToken })
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router