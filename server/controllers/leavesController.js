import Leave from "../models/Leaves.js";


const approve = async(req,res) =>{
    try{
        const {id} = req.params;
        const date = Date.now
        const approveLeave = await Leave.findByIdAndUpdate(id,{decision:"approved"})
        if(approveLeave){
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
        const approveLeave = await Leave.findByIdAndUpdate(id,{decision:"rejected"})
        if(approveLeave){
            res.status(200).json({success:true,message:"leave rejected success"})
        }
        
    }catch(error){
        res.status(500).json({success:false,error:"Error approve leave!"})
    }
}

export {approve,reject}