const express = require('express');
const shipmentRouter = require('./routes/shipmentRoutes');
const userRouter = require('./routes/userRoutes')
const globalErrorController = require('./controllers/errorController')
const AppError = require('./utils/appError')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express();

//Read data into req.body
app.use(express.json())
app.use(cookieParser())

//Implement cors
app.use(cors({
    origin: '*',
//   origin: process.env.FRONTEND_URL,
  credentials: true,               // Allow credentials such as cookies
}));

app.options('*', cors({
    // origin: process.env.FRONTEND_URL,
    origin: '*',
    credentials: true,
}));

app.use('/api/shipments', shipmentRouter);
app.use('/api/users', userRouter)

app.all('*', (req, res, next)=>{
    next(new AppError(`The requested url ${req.originalUrl} was not found on this server!`, '', 404))
});

app.use(globalErrorController)

module.exports = app;