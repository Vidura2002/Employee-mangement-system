import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(email,password);
        const user=await User.findOne({email})

        if(!user){
            res.status(404).json({success:false,error:"email not found"});
            return;
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(404).json({success:false,error:"password not match"});
            return;
        }

        const token=jwt.sign({_id:user._id,role:user.role},
            process.env.JWT_KEY,{expiresIn:"1d"}
        );

        res.status(200).json({success:true,token,user:{_id:user._id,role:user.role,name:user.name}})
    }catch(error){
        console.log(error);
    }
}

const verify= async(req,res) => {
    res.status(200).json({success:true,message:"verify success",user:req.user})
}

export {login,verify}