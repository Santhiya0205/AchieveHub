const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();const mongoose=require("mongoose"),User=require("./models/User");
(async()=>{try{if(!process.env.MONGO_URI)throw Error("MONGO_URI missing.");const email=process.env.ADMIN_EMAIL?.trim().toLowerCase();if(!email||email==="admin@example.com")throw Error("Set ADMIN_EMAIL to the email you registered.");await mongoose.connect(process.env.MONGO_URI);const u=await User.findOne({email});if(!u)throw Error("Register this account on the website first.");u.role="Admin";await u.save();console.log(`Admin role assigned to ${email}`);}catch(e){console.error(e.message);process.exitCode=1;}finally{if(mongoose.connection.readyState)await mongoose.disconnect();}})();
