const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const mongoose = require('mongoose')

const app = require('./app');

let DB;
if(process.env.NODE_ENV === 'production'){
    // DB = '';
    DB = process.env.DB_LOCAL;
}else{
    DB = process.env.DB_LOCAL;
}

mongoose.connect(DB).then(()=>console.log("DB connected successfully"))



const port = process.env.PORT || 7000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
});