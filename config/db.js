import mongoose from "mongoose";

const dbconnect = async()=>{
    try {
        
await mongoose.connect(process.env.mongourl)
 console.log("mongodn database is connected")
    } catch (error) {
        console.log(`database is not connect ${mongoose.connection.host}`),
        error
    }
};
export default dbconnect;
