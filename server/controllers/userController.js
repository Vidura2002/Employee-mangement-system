import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import Leave from "../models/Leaves.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Notifications from "../models/Notifications.js";
import bcrypt from 'bcrypt'


const request_leave = async(req,res) =>{
    try{
        const reason = req.body.reason;
        const date = req.body.date;
        const to = req.body.receiver;
        const from = req.body.from;
        const type = req.body.type;

        const leave_user = await User.findById(from);
        const message =`${leave_user.name} requested a ${type} leave request.Please make a decision!`;
        
        const newLeave = new Leave({
            user_id:from,
            reason,
            type,
            approved_by:to,
            decision:"pending",
            leave_date:date,
        });
        await newLeave.save();

        const notification = new Notifications({
            user:to,
            message,
            seen:false
        });
        await notification.save();

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

const getProject = async(req,res) =>{
    try{
        const id = new mongoose.Types.ObjectId(req.params);
        console.log(id)
        const project = await Project.findOne({_id:id}).populate("department")
        const leader = await Employee.findOne({_id:project.leader}).populate("userId",{password:0})
        const contributors = project.contributors;

        const contributors_name = await Promise.all(
            contributors.map(async (contributor) => {
                const user = await Employee.findOne({ _id: contributor }).populate("userId", { password: 0 });
                return user?.userId?.name || "Unknown"; // Handle missing userId
            })
        );
        console.log(contributors_name)
        console.log(project);
        res.status(200).json({success:true,message:"success",project,leader,contributors_name})
    }catch(error){
        res.status(500).json({success:false,error:"Faild"})
    }
}

const fetchNotifications = async(req,res) =>{
    try{
        const owner = new mongoose.Types.ObjectId(req.params);
        const notifications = await Notifications.find({user:owner}).sort({date:-1});
        console.log(notifications)
        res.status(200).json({success:true,message:"notifications fetch success.",notifications})
    }catch(error){
        res.status(500).json({success:false,error:"notifications fetch failed!"})
    }
}

const clickNotification = async(req,res) =>{
    try{
        const id = req.body.id;
        const update = await Notifications.findByIdAndUpdate(id,{seen:true});
        if(update){
            res.status(200).json({success:true,message:"success"})
        }
    }catch(error){
        res.status(500).json({success:false,error:"notification update error!"})
    }
}

const notificationCount = async(req,res) =>{
    try{
        console.log("pip pip")
        const {id} = req.params;
        const count = await Notifications.countDocuments({user:id,seen:false});
        console.log(count)
        if(count){
            res.status(200).json({success:true,count})
        }
    }catch(error){
        res.status(500).json({success:false,error:"Error"})
    }
}

const changePassword = async(req,res) =>{
    try{
        const password = req.body.currentpassword;
        const newPassword = req.body.newpassword;
        const user_id= req.body.id
        const user = await User.findOne({_id:user_id})
    
        const compare = await bcrypt.compare(password,user.password);
        console.log(compare)
        if(!compare){
            return res.status(200).json({success:false,error:"Existing password is incorrect!"})
        }
        
        const hashPassword = await bcrypt.hash(newPassword,12)
        const changepassword = await User.findByIdAndUpdate(user_id,{password:hashPassword})
        res.status(200).json({success:true,message:"Password has been updated successfully"})
        
    }catch(error){
        res.status(500).json({success:false,error:"Error updating the password!"})
    }
}

export {request_leave,getLeaves,myLeaves,cancelLeaves,updateProfile,getProject,fetchNotifications,clickNotification,notificationCount,changePassword}