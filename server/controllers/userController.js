import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import Leave from "../models/Leaves.js";


const request_leave = async(req,res) =>{
    try{
        const reason = req.body.reason;
        const date = req.body.date;
        const to = req.body.receiver;
        const from = req.body.from;
        const type = req.body.type
        
        const newLeave = new Leave({
            user_id:from,
            reason,
            type,
            approved_by:to,
            decision:"pending",
            leave_date:date,
        });
        await newLeave.save();
        res.status(200).json({success:true,message:"Leave request successed."})
    }catch(error){
        res.status(500).json({success:false,error:"Leave request faild!"})
    }
}

const getLeaves = async(req,res) =>{
    try{
        const  admin_id  = req.params;
        const ObjectId = new mongoose.Types.ObjectId(admin_id);
        const leaves = await Leave.find({approved_by:ObjectId,decision:"pending"}).populate("user_id",{password:0});
        res.status(200).json({success:true,message:"Leave fetch success.",leaves})
    }catch(error){
        res.status(500).json({success:false,error:"Fetching leaves error"})
    }
}

export {request_leave,getLeaves}