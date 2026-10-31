const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();
const express=require("express"),mongoose=require("mongoose"),cors=require("cors");
const app=express(),PORT=process.env.PORT||5000;
app.use(cors({origin:process.env.CLIENT_URL||"http://localhost:5173"}));app.use(express.json({limit:"1mb"}));
app.get("/",(req,res)=>res.send("AchieveHub API is running. Open the React frontend."));
app.get("/api/health",(req,res)=>res.json({message:"Backend is running successfully"}));
app.use("/api/auth",require("./routes/auth"));app.use("/api/achievements",require("./routes/achievements"));
async function start(){if(!process.env.MONGO_URI)throw Error("MONGO_URI missing in server/.env");if(!process.env.JWT_SECRET)throw Error("JWT_SECRET missing in server/.env");await mongoose.connect(process.env.MONGO_URI);console.log("Connected to MongoDB");app.listen(PORT,"0.0.0.0",()=>console.log(`AchieveHub API on ${PORT}`));}
start().catch(e=>{console.error("Startup failed:",e.message);process.exit(1);});
