import Employee from "../models/Employee.js"
import bcrypt from 'bcrypt'
import User from "../models/User.js"
import multer from "multer"
import { senEmail } from "../utils/emailServer.js"
import mongoose from "mongoose";
import Department from "../models/Department.js"
import Project from "../models/Project.js"

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"public/uploads")
    },
    filename: (req,res,cb) => {
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

const employeeAdd = async(req,res) =>{
    try{
        const {name,email,id,dob,gender,marital,designation,department,salary,password,role,image}=req.body

        const user = await User.findOne({email})
        if(user){
            return res.status(500).json({success:false,error:"This email already exist"})
        }

        const hashPassword = await bcrypt.hash(password,12)
        const newUser = new User({
            name,
            email,
            password:hashPassword,
            role,
        })
        const savedUser = await newUser.save()
        const newEmployee = new Employee({
            userId: savedUser._id,
            employee_id:id,
            date_of_birth:dob,
            gender,
            marital_status:marital,
            designation,
            department,
            salary
        })

        await newEmployee.save()
        
        const subject = "Inform about company registration"
        const text = `Hello ${name} \n\n Welcome to the company! We're excited to have you join us as a ${designation} in ${department} department 
        \n use your email as user name and password is mention below for the employee management system \n\n
        employee-id : ${id} \n password : ${password} \n salary : ${salary} \n\n We look forward to seeing you thrive and contribute to our shared goals. Together, we’re confident that we will achieve great things!
        \n\n Once again, welcome aboard, and we can’t wait to see you on your first day. \n\n Best regard Nishan Jayaroy \n CEO \n nishanjayaroy.co.info.com`;
        
        const sendemail = await senEmail(email,subject,text);
        if(senEmail){
            res.status(200).json({success:true,message:"Employee added success.",newEmployee})
        }
        
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,error:"Faild employee add"})
    }

}

const getEmployees = async(req,res) =>{
    try{
        const employees = await Employee.find().populate('userId',{password:0}).populate('department');
        res.status(200).json({success:true,message:"Data fetch success",employees})
    }catch(error){
        res.status(500).json({success:false,error:"error fetching data"})
    }
}

const getAdmins = async(req,res) =>{
    try{
        const admins = await User.find({role:"admin"})
        res.status(200).json({success:true,message:"Data fetch success",admins})
    }catch(error){
        res.status(500).json({success:false,error:"error fetching data"})
    }
}

const getEmployeeDetail = async(req,res) =>{
    try{
        const id = new mongoose.Types.ObjectId(req.params)
        console.log(id)
        const employee = await Employee.findById(id).populate('userId',{password:0}).populate('department')
        res.status(200).json({success:true,message:"Fetch employee success",employee})
        console.log(employee)
    }catch(error){
        res.status(500).json({success:false,error:"Fetch data failed"})
    }
}

const deleteEmploye= async(req,res) =>{
    try{
        const {id} = req.params;
        const employee = await Employee.findOne({_id:id})
        if(employee){
            const deleteUser = await User.findByIdAndDelete({_id:employee.userId})
            const deleteEmploye = await Employee.findByIdAndDelete({_id:id})
        }
        
        res.status(200).json({success:true,message:"Deletion success"})
    }catch(error){
        res.status(500).json({success:false,error:"Deletion failed!"})
    }
}

const getEmployeeId = async(req,res)=>{
    try{
        const user_id = new mongoose.Types.ObjectId(req.params)
        const em = await Employee.findOne({userId:user_id})
        const id = em._id
        res.status(200).json({success:true,message:"Em id getting success",id})
    }catch(error){
        res.status(500).json({success:false,error:"failed getting employee id"})
    }
}

const getprojectemployee = async(req,res)=>{
    try{
        const dept = new mongoose.Types.ObjectId(req.body.dept);
        const employees = await Employee.find({department:dept}).populate("userId" ,{password: 0})
        res.status(200).json({success:true,message:"success",employees})
    }catch(error){
        res.status(500).json({success:false,error:"error getting employees"})
    }
}

const addProject = async(req,res) =>{
    try{
        const title = req.body.title;
        const department = new mongoose.Types.ObjectId(req.body.department);
        const start = req.body.startDate;
        const leader = new mongoose.Types.ObjectId(req.body.leader);
        const description = req.body.description;
        let contributors = []

        req.body.contributors.forEach((contributor)=>{
            contributors.push(new mongoose.Types.ObjectId(contributor))
        });

        const project = new Project({
            title,
            department,
            start_date:start,
            leader,
            description,
            contributors,
            status:"ongoing",
        })
        project.save();
        res.status(200).json({success:true,message:"Project created successful"})
    }catch(error){
        res.status(500).json({success:false,error:"Faild to create project"})
    }
}

const fetchProjects = async(req,res) =>{
    try{
        const projects = await Project.find().populate("department");
        res.status(200).json({success:true,message:"Projects fetch success",projects})
    }catch(error){
        res.status(500).json({success:false,error:"error of fetching projects"})
    }
}

const completeProject = async(req,res) =>{
    try{
        const id = new mongoose.Types.ObjectId(req.body.id)
        const updateProject = await Project.findByIdAndUpdate(id,{status:"completed"})
        res.status(200).json({success:true,message:"Project completed successfully."})
    }catch(error){
        res.status(500).json({success:false,error:"Project completed error"})
    }
}


export {employeeAdd,upload,getEmployees,getEmployeeDetail,deleteEmploye,getAdmins,getEmployeeId,getprojectemployee,addProject,fetchProjects,completeProject}