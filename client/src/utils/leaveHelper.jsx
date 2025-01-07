

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

export const LeaveButtons = ({_id}) =>{
   return(
      <div className="flex flex-row gap-4">
         <button className="bg-teal-600 text-white rounded-md px-2 font-medium py-1 hover:bg-teal-700">Approve</button>
         <button className="bg-red-600 text-white rounded-md px-4 font-medium py-1 hover:bg-red-700">Reject</button>
      </div>
   )
}