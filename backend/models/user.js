const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "please add name here"]
    },
    userEmail: {
        type: String,
        required: [true, "please add email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please add password"]
    },
})

module.exports = mongoose.model('User', userSchema)