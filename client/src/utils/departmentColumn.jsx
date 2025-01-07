import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
    },
    {
        name: "Department",
        selector: (row) => row.dept_name,
    },
    {
        name: "Action",
        selector: (row) => row.action,
    },
];

const Delete = async (id, navigate) => {
    const confirm=window.confirm("Do you want to delete")
    if(confirm){
        try {
            const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                window.location.href="/admin-dashboard/departments"
            }
        } catch (error) {
            if (error.response?.data?.error) {
                alert(error.response.data.error);
            } else {
                alert("An error occurred while deleting the department.");
            }
        }
    }
};

export const DepartmentButtons = ({ _id }) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-3">
            <button
                className="px-4 py-1 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
                onClick={() => navigate(`/admin-dashboard/departments/${_id}`)}
            >
                Edit
            </button>
            <button
                className="px-3 py-1 bg-red-500 text-white rounded font-medium hover:bg-red-600"
                onClick={() => Delete(_id, navigate)} // Correct usage here
            >
                Delete
            </button>
        </div>
    );
};
