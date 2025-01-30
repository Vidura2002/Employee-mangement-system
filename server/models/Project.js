import mongoose, { Schema } from 'mongoose'

const projectScheme = new mongoose.Schema({
    title:{type:String,required:true},
    department:{type:Schema.Types.ObjectId,ref:"Department",required:true},
    start_date :{type:Date,required:true},
    leader:{type:Schema.Types.ObjectId,required:true,ref:"Employee"},
    description:{type:String,required:true},
    status:{type:String,enum:["ongoing","completed"],required:true},
    contributors:[{type:Schema.Types.ObjectId,ref:"Employee"}]
});

const Project = mongoose.model("Project",projectScheme);
export default Project