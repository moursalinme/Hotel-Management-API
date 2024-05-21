const express = require('express');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/AppError.js');
const globalErrorController = require('./controllers/errorController.js');
// Create App
const app = express();

// Enable JSON format
app.use(express.json());
app.use(cookieParser());


app.all('*', (req, res, next) => {
    next(new AppError(`The provided URL Not Found! ${req.originalUrl}`, 404));
});
app.use(globalErrorController);

module.exports = app;