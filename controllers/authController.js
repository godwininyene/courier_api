const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')
const {promisify} = require('util') 

const signToken = user =>{
    return jwt.sign({id:user.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN
    })
}

const createSendToken = (user, req, res, statusCode)=>{
    const token = signToken(user);

    const cookieOption = {
        httpOnly:true,
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000)

    }
    // Set 'secure' flag in production or if the request is secure
    if (process.env.NODE_ENV === 'production' || req.secure) {
        cookieOption.secure = true;
    }
    //Send the cookie
    res.cookie('jwt', token, cookieOption);

    //Remove Password from output
    user.password = undefined;
    user.passwordConfirm = undefined;

    res.status(statusCode).json({
        status:"success",
        token,
        data:{
            user
        }
    })
}


exports.signup = catchAsync(async(req, res, next)=>{
    const user = await User.create({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        password_confirm:req.body.password_confirm,
    });

    createSendToken(user, req, res, 201)
});

exports.login = catchAsync(async(req, res, next)=>{
    //1) Get POSTed email and password
    const{email, password} = req.body;

    // 2) Check if there is email and password
    if(!email || !password){
        return next(new AppError('Please provide email and password', '', 401))
    }

    // 3) Check if user exist and passord is correct
    const user = await User.findOne({email: email}).select('+password');
  
    if( !user || !(await user.correctPassword(password, user.password))){
        return next(new AppError("Password or email is incorrect", '', 401))
    }

    // 4) Everything is okay, send token to client
    createSendToken(user, req, res, 200)
});


exports.logout = (req, res, next)=>{
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly:true
    });
    res.status(200).json({status: 'success'})
}

exports.protect = catchAsync(async(req, res, next) =>{
    // 1) Get token and check if it there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }else if(req.cookies.jwt){
        token = req.cookies.jwt;
    }

    if(!token){
        return next(new AppError('You are not log in! Please log in to get access', '', 401))
    }

    // 2) validate token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  
    // 3) Check if user still exist
    const currentUser = await User.findById(decoded.id)
    if(!currentUser){
        return next(new AppError('The user belonging to this token does no longer exist.', '', 401))
    }

    //GRANT ACCESS TO  PROTECTED ROUTE
    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles)=>{
    return(req, res, next)=>{
        if(!roles.includes(req.user.role) ){
            return next(new AppError("You do not have the permission to perform this operation", '', 403))
        }
        next()
    }
};