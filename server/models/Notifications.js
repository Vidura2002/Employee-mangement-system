import mongoose, { Schema } from 'mongoose'

const NotificationSchema = new mongoose.Schema({
    user:{type:Schema.Types.ObjectId,required:true,ref:"User"},
    message:{type:String,required:true},
    seen:{type:Boolean,required:true},
    date:{type:Date,required:true,default:Date.now}
});

const Notifications = mongoose.model("Notifications",NotificationSchema);
export default Notifications;