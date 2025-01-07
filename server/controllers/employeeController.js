import Employee from "../models/Employee.js"
import bcrypt from 'bcrypt'
import User from "../models/User.js"
import multer from "multer"

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
        res.status(200).json({success:true,message:"Employee added success.",newEmployee})
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
        const {id} = req.params;
        const employee = await Employee.findById(id).populate('userId',{password:0}).populate('department')
        res.status(200).json({success:true,message:"Fetch employee success",employee})
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

export {employeeAdd,upload,getEmployees,getEmployeeDetail,deleteEmploye,getAdmins}