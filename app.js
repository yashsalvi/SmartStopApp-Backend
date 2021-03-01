const express = require('express');
const bodyParser = require('body-parser');


const userRoute = require('./routes/user');
const stoplogRoute = require('./routes/stoplog');
// const officerRoute = require('./routes/officer');

const imageRoute = require('./routes/images');

const app = express();

app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));


app.use("/user", userRoute);
app.use("/stoplog", stoplogRoute);
// app.use("/officer", officerRoute);

app.use("/images", imageRoute);

module.exports = app;
