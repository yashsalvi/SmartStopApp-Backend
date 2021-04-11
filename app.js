const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const stopLogRoute = require('./routes/stopLog');

const imageRoute = require('./routes/images');

const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use("/user", userRoute);
app.use("/stopLog", stopLogRoute);
app.use("/images", imageRoute);


module.exports = app;
