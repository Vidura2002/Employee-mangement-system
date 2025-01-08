import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Leavecolumns = [
   {
    name:"S no",
    selector:(row)=> row.sno
   },
   {
    name:"Employee name",
    selector:(row)=>row.name
   },
   {
    name:"Reason",
    selector:(row)=>row.reason
   },
   {
    name:"Leave date",
    selector:(row)=>row.date
   },
   {
      name:"Action",
      selector:(row)=>row.action
   }
]

const approveLeave = async(id,navigate) =>{
   const confirm = window.confirm("Do you want to approve that leave?");

   if(confirm){
      try{
         const response = await axios.put(`http://localhost:3000/api/leaves/${id}`,
            {},
            {
               headers:{
                  "Authorization" :`Bearer ${localStorage.getItem("token")}`
               }
            }
         )
         if(response.data.success){
            window.location.href="/admin-dashboard/leaves";
         }
      }catch(error){
         if(error & !error.response.data.error){
            console.log(error.response.data.error);
         }
      }
   }
}

const rejectLeave = async(id,navigate) =>{
   try{
      const confirm = window.confirm("Do you want to reject this leave?")
      if(confirm){
         const response = await axios.put(`http://localhost:3000/api/leaves/reject/${id}`,
            {},
            {
               headers:{
                  "Authorization":`Bearer ${localStorage.getItem("token")}`
               }
            }
         )
         if(response.data.success){
            window.location.href="/admin-dashboard/leaves"
         }
      }
   }catch(error){
      if(error && !error.response.data.error){
         console.error(error.response.data.error)
      }
   }
}

export const LeaveButtons = ({_id}) =>{
   const navigate = useNavigate()
   return(
      <div className="flex flex-row gap-4">
         <button className="bg-teal-600 text-white rounded-md px-2 font-medium py-1 hover:bg-teal-700"
         onClick={()=>{approveLeave(_id,navigate)}}
         >Approve</button>
         <button className="bg-red-600 text-white rounded-md px-4 font-medium py-1 hover:bg-red-700"
         onClick={()=>{rejectLeave(_id,navigate)}}
         >Reject</button>
      </div>
   )
}