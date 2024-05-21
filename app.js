const express = require('express');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError.js');
const globalErrorController = require('./controllers/errorController.js');

const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');
// const { version } = require('mongoose');


const swaggerOptions = {
    swaggerDefinition : {
        openapi: '3.0.0', 
        info: {
            version: '1.0.0', 
            title: 'Swagger Setup', 
            description: 'Swagger Documentation of Hotel management System API.', 
            contact: {
                name: 'Moursalin', 

            }, 
            servers: ['http://localhost:3030'],
        },
        schemes: ['http', 'https'],
    },
    apis: ['./swagger/*/*.js',]
};


// Create App
const app = express();

// Enable JSON format
app.use(express.json());
app.use(cookieParser());

const swaggerDocs = swaggerjsdoc(swaggerOptions);
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocs));

// Import and add the routes
const UserRouter = require('./routes/userRoute');

app.use('/api/users', UserRouter);


app.all('*', (req, res, next) => {
    next(new AppError(`The provided URL Not Found! ${req.originalUrl}`, 404));
});
app.use(globalErrorController);

module.exports = app;