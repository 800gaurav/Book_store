import mongoose from "mongoose";

const orderschema = new mongoose.Schema({
User:{
    type:mongoose.Types.ObjectId,
    ref:"user",
},
Book:{
    type:mongoose.Types.ObjectId,
    ref:"book",
},
status:{
    type: String,
    default: 'order placed',
    enum: ['order placed', 'out for delivery', 'delivered', 'canceled']
},

},{timestamps:true});

const order = mongoose.model("order" , orderschema);
 export default order