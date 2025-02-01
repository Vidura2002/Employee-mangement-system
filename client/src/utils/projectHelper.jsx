import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Dialog } from "@headlessui/react";
import { Button } from '@mui/material'
import { FaSearch } from "react-icons/fa";

export const projectColumns=[
    {
        name:"Project Title",
        selector:(row)=>row.title
    },
    {
        name:"Department",
        selector:(row)=>row.department
    },
    {
        name:"Start Date",
        selector:(row)=>row.start_date
    },
    {
        name:"Status",
        selector:(row)=>row.status
    },
    {
        name:"Action",
        selector:(row)=>row.action
    }
]

const completeProject = async (id, navigate) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/employee/completeproject",
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.data.success) {
        window.location.href="/admin-dashboard/project";
      }
    } catch (error) {
      alert(error?.response?.data?.error || "An error occurred");
    }
  };
  
  export const ProjectButtons = ({ id}) => {
    const navigate = useNavigate()
    const [isOpen,setOpen] = useState(false)
    const [title,setTitle] = useState("")
    const [startDate,setDate] = useState("")
    const [description,setDescription] = useState("")
    const [status,setStatus] = useState("")
    const [department,setDepartment] = useState("")
    const [leader,setLeader] = useState("")
    const [contributors,setContributors] = useState([])

    const openModel = async() =>{
      try{
        const response = await axios.get(`http://localhost:3000/api/user/getproject/${id}`,
          {
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
          }
        )
        if(response.data.success){
          setTitle(response.data.project.title)
          setDate(new Date(response.data.project.start_date).toDateString())
          setDescription(response.data.project.description)
          setStatus(response.data.project.status)
          setDepartment(response.data.project.department.dept_name)
          setLeader(response.data.leader.userId.name)
          setContributors(response.data.contributors_name)
          setOpen(true)
        }
      }catch(error){
        if(error && !error.response.data.error){
          alert(error.response.data.error)
        }
      }
    }
    return (
      <>
        <Button
          //className="bg-blue-600 font-bold px-2 py-1.5 rounded-md font-bold  hover:bg-blue-700"
          variant="contained"
          startIcon={<FaSearch/>}
          size="small"
          color="secondary"
          onClick={openModel}
        >
          Explore
        </Button>


  <Dialog open={isOpen} onClose={() => setOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p className="bg-gray-200 px-4 py-1 rounded"><strong>Department:</strong> {department}</p>
    <p className="bg-gray-200 px-4 py-1 rounded"><strong>Start Date:</strong> {startDate}</p>
    <p className="bg-gray-200 px-4 py-1 rounded"><strong>Project Leader:</strong> {leader}</p>
    <p className="bg-gray-200 px-4 py-1 rounded"><strong>Description:</strong> {description}</p>
    <p className="bg-gray-200 px-4 py-1 rounded"><strong>Status:</strong> {status}</p>
    <p className="bg-gray-200 px-4 py-1 rounded"><strong>Contributors:</strong></p>
    <div className="flex flex-row gap-4 mt-2">
      {contributors.map((item,index)=>(
      <p key={index} className="bg-gray-700 text-white px-2 rounded py-1 text-sm shadow-md">{item}</p>
      ))}
    </div>

    <div className="flex flex-row gap-2">
      {status==="ongoing" ? 
    <button
    className="mt-4 bg-green-600 px-4 py-2 text-white  rounded hover:bg-green-700"
    onClick={completeProject}
    >
      Completed
    </button>
    : null }

    <button
      className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      onClick={() => setOpen(false)}
    >
      Close
    </button>

    </div>
    
    
  </div>
  </Dialog>
        
      </>
    );
  };
  