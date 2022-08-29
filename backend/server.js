const express = require("express");
const colors = require("colors");
require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandling");
port = process.env.PORT || 5000;
const app = express();
connectDB();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use("/api/podcast", require("./routes/podcastRoutes"));
app.use('/api/users', require('./routes/userRoute'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
