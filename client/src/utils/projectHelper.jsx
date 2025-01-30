import axios from "axios"
import { useNavigate } from "react-router-dom"

export const projectColumns=[
    {
        name:"S no",
        selector:(row)=>row.sno
    },
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
    return (
      <button
        onClick={() => {completeProject(id, navigate)}}
        className="bg-teal-600 font-bold px-2 py-1.5 rounded-md font-bold  hover:bg-teal-700"
      >
        Completed
      </button>
    );
  };
  