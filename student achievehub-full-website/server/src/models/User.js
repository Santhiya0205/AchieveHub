const mongoose = require("mongoose");
const schema = new mongoose.Schema({
 name:{type:String,required:true,trim:true,maxlength:80},
 email:{type:String,required:true,unique:true,lowercase:true,trim:true},
 password:{type:String,required:true,select:false},
 role:{type:String,enum:["Student","Faculty","Admin"],default:"Student",required:true},
 department:{type:String,trim:true,default:""}, year:{type:String,default:""},
 careerGoal:{type:String,enum:["Full Stack Developer","Data Analyst","Cybersecurity Analyst","UI/UX Designer","Cloud Engineer"],default:"Full Stack Developer"},
 bio:{type:String,default:"",maxlength:500}
},{timestamps:true});
module.exports=mongoose.model("User",schema);
