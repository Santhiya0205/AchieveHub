const mongoose = require("mongoose");
const schema = new mongoose.Schema({
 title:{type:String,required:true,trim:true,maxlength:120},
 description:{type:String,required:true,trim:true,maxlength:2000},
 category:{type:String,required:true,enum:["Certification","Competition","Project","Internship","Workshop","Publication","Other"]},
 dateAchieved:{type:Date,required:true}, certificateUrl:{type:String,default:""},
 skills:[String], student:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
 status:{type:String,enum:["pending","approved","rejected"],default:"pending"},
 verifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",default:null},
 verifiedAt:{type:Date,default:null}, rejectionReason:{type:String,default:""}
},{timestamps:true});
module.exports=mongoose.model("Achievement",schema);
