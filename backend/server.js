const express = require('express')
require('dotenv').config()
port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})