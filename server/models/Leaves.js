import mongoose, { Schema } from "mongoose";


const leavesSchema = mongoose.Schema({
    employee_id:{type:Schema.Types.ObjectId,required:true,ref:"Employee"},
    reason:{type:String,required:true},
    approved:{type:Boolean,required:true},
    approved_by:{type:Schema.Types.ObjectId,ref:"User"},
    requestedAt:{type:Date,default:Date.now,required:true},
    leave_date:{type:Date,default:Date.now,required:true},
    approvededAt:{type:Date,default:Date.now}
});

const Leave = mongoose.model("Leave",leavesSchema);
export default Leave;