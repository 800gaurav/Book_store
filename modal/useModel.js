import mongoose, { Mongoose } from "mongoose";

const userschema = new mongoose.Schema({
 username:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:[true, "email is required"],
    unique: true
 },
 password:{
    type:String,
    required:[true, "password is required"]
 },
 address:{
    type:Array
 },
 avtar:{
   type:String,
   default:'https://tse4.mm.bing.net/th?id=OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa&pid=Api&P=0&h=180'
 },
 role:{
   type:String,
   default:'user',
   enum:['user','admin'],
 },

 favorites:[
 {
   type:mongoose.Types.ObjectId,
   ref:'book'
 }],

 cart:[
 {
  type:mongoose.Types.ObjectId,
   ref:'book'
 }],

 orders:[
 {
  type:mongoose.Types.ObjectId,
   ref:'order'
 }],
//  usertype:{
//     type:String,
//     required:true,
//     default:"client",
//     enum:['client', 'admin', 'vender', 'driver']
// },
// profile:{
//     type:String,
//     default:'https://www.flaticon.com/free-icon/user_149071'
// }

},{timestamps:true});


const user =  mongoose.model('user', userschema );

export default user


