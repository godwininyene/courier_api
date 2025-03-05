const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:[true, 'Please provide firstname.']
    },
    last_name:{
        type:String,
        required:[true, 'Please provide lastname.']
    },
    email:{
        type:String,
        required:[true, 'Please provide email address']
    },
    role:{
        type:String,
        enum:{
            values:['user', 'admin'],
            message:'Role is either: admin or user. Got {VALUE}'
        },
        default:'user'
    },
    password:{
        type:String,
        required:[true, 'Please provide password'],
        minlength:[8, 'The password field must be at least 8 characters.'],
    },
    password_confirm:{
        type:String,
        required:[true, 'Please confirm your password'],
        validate:{
            validator:function(el){
                return el === this.password
            },
            message:'The password field confirmation does not match.'
        }
    },
})

//Middlewares
userSchema.pre('save', async function(next){
    //Only run this function if password is actually modified
    if(!this.isModified("password")) return next()

    // Hash the password with a cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //Delete the passwordConfirm field
    this.password_confirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}
module.exports = new mongoose.model("User", userSchema);