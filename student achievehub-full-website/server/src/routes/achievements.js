const router=require("express").Router();
const Achievement=require("../models/Achievement");
const {authenticate,requireReviewer}=require("../middleware/auth");
const cats=["Certification","Competition","Project","Internship","Workshop","Publication","Other"];
router.use(authenticate);
router.post("/",async(req,res)=>{try{
 const {title,description,category,dateAchieved,certificateUrl,skills}=req.body;
 if(!title?.trim()||!description?.trim()||!cats.includes(category)||!dateAchieved)return res.status(400).json({message:"Complete all required fields."});
 if(certificateUrl&&!/^https?:\/\//i.test(certificateUrl))return res.status(400).json({message:"Certificate URL must start with http:// or https://."});
 const achievement=await Achievement.create({title,description,category,dateAchieved,certificateUrl:certificateUrl||"",skills:Array.isArray(skills)?skills:[],student:req.user._id});
 res.status(201).json({achievement,message:"Submitted for review."});
 }catch(e){res.status(500).json({message:"Could not submit achievement."});}});
router.get("/mine",async(req,res)=>res.json({achievements:await Achievement.find({student:req.user._id}).sort({createdAt:-1})}));
router.get("/review/all",requireReviewer,async(req,res)=>{const f={};if(["pending","approved","rejected"].includes(req.query.status))f.status=req.query.status;res.json({achievements:await Achievement.find(f).populate("student","name email department year").populate("verifiedBy","name role").sort({createdAt:-1})});});
router.patch("/review/:id",requireReviewer,async(req,res)=>{try{
 const {status,rejectionReason}=req.body;if(!["approved","rejected"].includes(status))return res.status(400).json({message:"Choose approved or rejected."});
 const a=await Achievement.findById(req.params.id);if(!a)return res.status(404).json({message:"Achievement not found."});
 a.status=status;a.verifiedBy=req.user._id;a.verifiedAt=new Date();a.rejectionReason=status==="rejected"?(rejectionReason||"Please review and resubmit."):"";await a.save();
 await a.populate("student","name email department year");res.json({achievement:a,message:`Achievement ${status}.`});
 }catch(e){res.status(400).json({message:"Could not review achievement."});}});
router.delete("/:id",async(req,res)=>{try{
 const a=await Achievement.findById(req.params.id);if(!a)return res.status(404).json({message:"Achievement not found."});
 const owner=a.student.toString()===req.user._id.toString(),reviewer=["Admin","Faculty"].includes(req.user.role);
 if(!owner&&!reviewer)return res.status(403).json({message:"Not allowed."});
 if(owner&&a.status==="approved"&&!reviewer)return res.status(403).json({message:"Approved records can only be removed by a reviewer."});
 await a.deleteOne();res.json({message:"Deleted."});
 }catch(e){res.status(400).json({message:"Could not delete achievement."});}});
module.exports=router;
