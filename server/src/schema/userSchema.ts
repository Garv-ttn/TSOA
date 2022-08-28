import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    
})

const User1 = mongoose.model('user', userSchema);
export default User1;