const express = require('express');
const cookieParser = require('cookie-parser');

// Create App
const app = express();


// Enable JSON format
app.use(express.json());
app.use(cookieParser());



module.exports = app;