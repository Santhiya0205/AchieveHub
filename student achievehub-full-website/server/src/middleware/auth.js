const jwt=require("jsonwebtoken");
const User=require("../models/User");
async function authenticate(req,res,next){
 try{
  const h=req.headers.authorization||"";
  if(!h.startsWith("Bearer ")) return res.status(401).json({message:"Please log in first."});
  const d=jwt.verify(h.slice(7),process.env.JWT_SECRET);
  const user=await User.findById(d.userId).select("_id name email role department year careerGoal bio");
  if(!user)return res.status(401).json({message:"Account not found."});
  req.user=user;next();
 }catch(e){return res.status(401).json({message:"Invalid or expired session. Please log in again."});}
}
function requireReviewer(req,res,next){if(!req.user||!["Faculty","Admin"].includes(req.user.role))return res.status(403).json({message:"Faculty or Admin access required."});next();}
module.exports={authenticate,requireReviewer};
