import mongoose, { Schema } from "mongoose";


const employeeSchema = new mongoose.Schema({
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    //name : {type:String,required:true},
    //email:{type:String,required:true},
    employee_id:{type:String,required:true,unique:true},
    date_of_birth:{type:Date,required:true},
    gender:{type:String,enum:["male","female","other"],required:true},
    marital_status:{type:String,enum:["single","married"],required:true},
    designation:{type:String,required:true},
    department:{type:Schema.Types.ObjectId,ref:"Department",required:true},
    salary:{type:Number,required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
    //password:{type:String,required:true},
    //role:{type:String,enum:["admin","employee"],required:true},
    //image:{type:String}
})

const Employee = mongoose.model("Employee",employeeSchema)

export default Employee