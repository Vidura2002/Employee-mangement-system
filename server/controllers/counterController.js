import Department from "../models/Department.js";
import Employee from "../models/Employee.js"


const counter = async(req,res) =>{
    try{
        const employee_count = await Employee.countDocuments();
        const dept_count = await Department.countDocuments();

        res.status(200).json({success:true,message:"Data count fetched success.",employee_count,dept_count})
    }catch(error){
        res.status(500).json({success:false,error:"Faild to fetch data count."})
    }
}

export {counter}