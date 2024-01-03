const express = require('express');
const dotenv = require('dotenv');

const weatherRoute = require('./routes/weather.route');

const app = express();
dotenv.config();

app.use('/api',weatherRoute);

app.listen(8080,()=>{

    console.log("Backend server is running.");
})