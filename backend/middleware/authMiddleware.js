const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const user = require('../models/user')

const protect = asyncHandler(async (req, res, next) => {
    try {
        // get token from user
        const token = req.headers.authorization.split(" ")[1]
        // verify token
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
        // get user from user
        req.user = await user.findById(decodedUser.id)
    } catch (error) {
        res.status(401)
        console.log(error)
        throw new Error("Authorization failed")
    }
    // execute other processes
    next()
})

module.exports = { protect }