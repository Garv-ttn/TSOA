import mongoose from "mongoose";

const dbconnect = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017')
        console.log('Connected to database');
    }catch(e){
        console.log(e)
    }
}
export default dbconnect;
