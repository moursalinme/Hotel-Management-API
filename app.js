const express = require('express');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError.js');
const globalErrorController = require('./controllers/errorController.js');

// for swagger
const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');


const swaggerOptions = {
    swaggerDefinition : {
        openapi: '3.0.0', 
        info: {
            version: '1.0.0', 
            title: 'Swagger Setup', 
            description: 'Swagger Documentation of Hotel Management System API.', 
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
const RoomRouter = require('./routes/roomRoute');
const reservationRouter = require('./routes/reservationRoute.js');
// const AdminRouter = require('./routes/adminRoute.js')

app.use('/api/users', UserRouter);
app.use('/api/rooms', RoomRouter);
app.use('/api/book', reservationRouter);


app.all('*', (req, res, next) => {
    next(new AppError(`The provided URL Not Found! ${req.originalUrl}`, 404));
});
app.use(globalErrorController);

module.exports = app;