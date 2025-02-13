import Leave from "../models/Leaves.js";
import Notifications from "../models/Notifications.js";


const approve = async(req,res) =>{
    try{
        const {id} = req.params;
        const date = Date.now
        const leave = await Leave.findOne({_id:id})
        const approveLeave = await Leave.findByIdAndUpdate(id,{decision:"approved"})
        if(approveLeave){

            const notification = new Notifications({
                user:leave.user_id,
                message: `Your ${leave.type} leave request has been approved by Admin panel.`,
                seen:false
            });
            notification.save()

            res.status(200).json({success:true,message:"leave approved success"})
        }
        
    }catch(error){
        res.status(500).json({success:false,error:"Error approve leave!"})
    }
}

const reject = async(req,res) =>{
    try{
        const {id} = req.params;
        const date = Date.now
        const leave = await Leave.findOne({_id:id})
        const approveLeave = await Leave.findByIdAndUpdate(id,{decision:"rejected"})
        if(approveLeave){
            
            const notification = new Notifications({
                user:leave.user_id,
                message: `Your ${leave.type} leave request has been rejected by Admin panel.`,
                seen:false
            });
            notification.save()

            res.status(200).json({success:true,message:"leave rejected success"})
        }
        
    }catch(error){
        res.status(500).json({success:false,error:"Error approve leave!"})
    }
}

export {approve,reject}