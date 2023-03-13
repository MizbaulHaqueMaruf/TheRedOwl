import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    firstname:{
        type:String,
        required: true
    },
    lastname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,        
    }

})

const user = mongoose.model('user', userSchema);

export default user;