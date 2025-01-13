import mongoose, { Schema } from "mongoose";


const leavesSchema =new mongoose.Schema({
    user_id:{type:Schema.Types.ObjectId,required:true,ref:"User"},
    reason:{type:String,required:true},
    type :{type:String,enum:["Full Day","Half Day"],required:true},
    decision:{type:String,enum:['approved',"rejected","pending"],required:true},
    approved_by:{type:Schema.Types.ObjectId,ref:"User"},
    requestedAt:{type:Date,default:Date.now,required:true},
    leave_date:{type:Date,required:true},
});

const Leave = mongoose.model("Leave",leavesSchema);
export default Leave;