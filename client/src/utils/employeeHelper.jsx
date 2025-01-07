import axios from "axios"
import { useNavigate } from "react-router-dom";


const fetchDept = async() =>{
    let departments;
    try{
        const response = await axios.get("http://localhost:3000/api/department",{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(response.data.success){
            departments=response.data.departments
        }
        
    }catch(error){
        if(error && !error.response.data.error){
            alert(error.response.data.error)
        }
    }
    return departments;
}

const fetchAdmins = async() =>{
    let admins;
    try{
        const response = await axios.get("http://localhost:3000/api/employee/getadmins",{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(response.data.success){
            admins=response.data.admins
        }
        
    }catch(error){
        if(error && !error.response.data.error){
            alert(error.response.data.error)
        }
    }
    return admins;
}

export const emColumns =[
    {
        name:"S no",
        selector:(row) => row.sno,
        width:"70px"
    },
    {
        name:"Employee ID",
        selector:(row) => row.employee_id,
        width:"120px"
    },
    {
        name:"Name",
        selector:(row) => row.name,
        sortable:true
    },
    {
        name:"Birthday",
        selector:(row)=> row.Birthday,
        width:"130px",
        sortable:true
    },
    {
        name:"Department",
        selector:(row)=>row.department,
        width:"110px"
    },
    {
        name:"Action",
        selector:(row) => row.action,
        width:"300px"
    }
]

const deleteEmployee = async(id,navigate) => {
    const confirm = window.confirm("Do you want to delete that employee?")

    if(confirm){
        try{
            const response = await axios.delete(`http://localhost:3000/api/employee/${id}`,
                {
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            if(response.data.success){
                window.location.href="/admin-dashboard/employee"
            }
        }catch(error){
            if(error && !error.response.data.error){
                alert(error.response.data.error)
            }
        }
    }

}

 export const EmployeeButtons = ({ _id }) =>{
    const navigate = useNavigate()
    return(
        <div className="flex space-x-3">
            <button 
            className="bg-teal-600 text-white px-4 py-1 rounded-md font-medium hover:bg-teal-700"
            onClick={()=>navigate(`/admin-dashboard/employee/${_id}`)}
            >
                View</button>
            <button className="bg-blue-600 text-white px-5 py-1 rounded-md font-medium hover:bg-blue-700"
            onClick={()=>navigate(`/admin-dashboard/employee-edit/${_id}`)}
            >Edit</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded-md font-medium hover:bg-red-600"
            onClick={()=>{deleteEmployee(_id,navigate)}}
            >Remove</button>
        </div>
    )
}

export {fetchDept,fetchAdmins}