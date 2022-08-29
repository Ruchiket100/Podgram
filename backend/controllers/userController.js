const asyncHandler = require("express-async-handler")
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(
    async (req, res) => {
        const { userName, userEmail, password } = req.body;
        if (!userName || !userEmail || !password) {
            res.status(404)
            throw new Error("please fill up all requirments")
        }
        // check if user already exsists
        const isUserExists = await User.findOne({ userEmail })
        if (isUserExists) {
            res.status(404)
            throw new Error('user already exsits')
        }
        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // create user
        const user = await User.create({ userName, userEmail, password: hashedPassword })
        if (user) {
            res.status(201)
            res.json({
                _id: user.id,
                userName: user.userName,
                userEmail: user.userEmail,
                token: generateJwtToken(user._id)
            })
        }
        else {
            res.status(404)
            throw new Error('Invalid user Data')
        }
    }
)

// @desc    login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(
    async (req, res) => {
        const { userEmail, password } = req.body
        // check if user exsits
        const user = await User.findOne({ userEmail })
        if (user && await bcrypt.compare(password, user.password)) {
            res.json({
                _id: user.id,
                userName: user.userName,
                userEmail: user.userEmail,
                token: generateJwtToken(user._id)
            })
        }
        else {
            res.status(404)
            throw new Error("user not exists")
        }
    }
)

// @desc    get user data
// @route   GET /api/users/me
// @access  Private
const userProfile = asyncHandler(async (req, res) => {
    res.json(req.user).status(200)
})


//  generate jwt token
const generateJwtToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    return token
}

module.exports = {
    registerUser,
    loginUser,
    userProfile
}