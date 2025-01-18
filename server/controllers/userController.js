import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import Leave from "../models/Leaves.js";
import User from "../models/User.js";


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

const myLeaves = async(req,res) =>{
    try{
        const user_id = new mongoose.Types.ObjectId(req.params);
        const leaves = await Leave.find({user_id:user_id});
        res.status(200).json({success:true,message:"Leaves get success.",leaves})
    }catch(error){
        res.status(500).json({success:false,error:"Leave fetched error"})
    }
}

const cancelLeaves = async(req,res) =>{
    try{
        const id = new mongoose.Types.ObjectId(req.params);
        const deletion = await Leave.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"leave deleted successfully"})
    }catch(error){
        res.status(500).json({success:false,error:"leave deletion failed"})
    }
}

const updateProfile = async(req,res) =>{
    try{
        const em_id = req.body.employee_id;
        const user_id = req.body.id;
        const email = req.body.email;
        const salary = req.body.salary;
        const designation = req.body.designation;
        const marital = req.body.marital;
        const name = req.body.name;

       const employee = await Employee.findOne({userId:user_id});

        const update_user = await User.updateOne({_id:user_id},{
            $set:{
                name:name,
                email:email
            }
        }
        );

        const update_employee = await Employee.updateOne({_id:employee._id},{
            $set:{
                marital_status:marital,
                salary:salary,
                designation:designation,
            }
        });

        res.status(200).json({success:true,message:"Profile updated successfull"})
    }catch(error){
        res.status(500).json({success:false,error:"Profile update failed!"})
    }
}



export {request_leave,getLeaves,myLeaves,cancelLeaves,updateProfile}