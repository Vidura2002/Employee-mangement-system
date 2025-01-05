import Department from "../models/Department.js";

const getDepartments = async(req,res) =>{
    try{
        const departments= await Department.find()
        res.status(200).json({success:true,message:"Department getting success",departments})
    }catch(error){
        res.status(500).json({success:false, error:"server error fetching departments"})
    }

}

const addDepartment = async(req,res)=>{
    try{
        const dept_name=req.body.department;
        const description=req.body.description;

        const newDept= new Department({
            dept_name,
            description
        })
        await newDept.save()
        return res.status(200).json({success:true,department:newDept, message:"Department added successfully."})
    }catch(error){
        res.status(500).json({success:false , error:"serevr error in department"})
    }
}

const getDapartmentId = async(req,res) =>{
    try{
        const {id}=req.params;

        const department= await Department.findById({_id:id})
        res.status(200).json({success:true,message:"Getting success",department})
    }catch(error){
        res.status(500).json({success:false,error:"Error getting department"})
    }
}


const editDepartment = async(req,res) =>{
    try{
        const {id,dept_name,description}=req.body

        const department = await Department.findByIdAndUpdate({_id:id},{dept_name:dept_name,description:description})
        res.status(200).json({success:true,message:"Updated success"})
    }catch(error){
        res.status(500).json({success:false,error:"Update failed!"})
    }
}

const deleteDepartment = async(req,res) =>{
    try{
        const {id}=req.params;
        const deleteDept= await Department.findByIdAndDelete({_id:id})
        res.status(200).json({success:true,message:"Delete success."})
    }catch(error){
        res.status(500).json({success:false,error:"Delete failed!"})
    }
}
export {addDepartment,getDepartments,getDapartmentId,editDepartment,deleteDepartment}