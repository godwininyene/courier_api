const express = require('express');
const shipmentRouter = require('./routes/shipmentRoutes');
const userRouter = require('./routes/userRoutes')
const globalErrorController = require('./controllers/errorController')
const AppError = require('./utils/appError')
const cookieParser = require('cookie-parser')

const app = express();

//Read data into req.body
app.use(express.json())
app.use(cookieParser())

app.use('/api/shipments', shipmentRouter);
app.use('/api/users', userRouter)

app.all('*', (req, res, next)=>{
    next(new AppError(`The requested url ${req.originalUrl} was not found on this server!`, '', 404))
});

app.use(globalErrorController)

module.exports = app;