const router=require("express").Router();
const bcrypt=require("bcryptjs"),jwt=require("jsonwebtoken");
const User=require("../models/User"),{authenticate}=require("../middleware/auth");
const token=u=>jwt.sign({userId:u._id},process.env.JWT_SECRET,{expiresIn:"7d"});
const safe=u=>({_id:u._id,name:u.name,email:u.email,role:u.role,department:u.department,year:u.year,careerGoal:u.careerGoal,bio:u.bio});
router.post("/register",async(req,res)=>{try{
 const {name,email,password,department,year,careerGoal}=req.body;
 if(!name?.trim()||!email?.trim()||!password)return res.status(400).json({message:"Name, email and password are required."});
 if(password.length<8)return res.status(400).json({message:"Password must be at least 8 characters."});
 const e=email.trim().toLowerCase();if(await User.findOne({email:e}))return res.status(409).json({message:"Email already registered."});
 const u=await User.create({name:name.trim(),email:e,password:await bcrypt.hash(password,12),role:"Student",department:department||"",year:year||"",careerGoal:careerGoal||"Full Stack Developer"});
 res.status(201).json({token:token(u),user:safe(u)});
 }catch(e){res.status(500).json({message:"Could not register account."});}});
router.post("/login",async(req,res)=>{try{
 const email=req.body.email?.trim().toLowerCase(),password=req.body.password;
 if(!email||!password)return res.status(400).json({message:"Email and password are required."});
 const u=await User.findOne({email}).select("+password");
 if(!u||!await bcrypt.compare(password,u.password))return res.status(401).json({message:"Incorrect email or password."});
 res.json({token:token(u),user:safe(u)});
 }catch(e){res.status(500).json({message:"Could not log in."});}});
router.get("/me",authenticate,(req,res)=>res.json({user:req.user}));
router.patch("/me",authenticate,async(req,res)=>{try{
 for(const k of ["name","department","year","careerGoal","bio"])if(req.body[k]!==undefined)req.user[k]=req.body[k];
 await req.user.save();res.json({user:req.user});
 }catch(e){res.status(400).json({message:"Could not update profile."});}});
module.exports=router;
