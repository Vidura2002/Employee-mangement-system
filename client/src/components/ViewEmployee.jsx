import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EmployeeIDCard from './EmployeeIDCard';

const ViewEmployee = () => {

    const {id} = useParams();
    const [employeeDetails,setDetail] = useState([])
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [role,setRole]=useState("")
    const [employee_id,setID]=useState("")
    const [dob,setDOB]=useState("")
    const [gender ,setGender]=useState("")
    const [maritalStat,setMarital]=useState("")
    const [designation,setDesignation]=useState("")
    const [department,setDepartment] = useState("")
    const [created,setCreated]=useState("")
    const [loading,setLoading] = useState(false)
    const [image,setImage] = useState(null)

    useEffect(()=>{

        const fetchEmployee = async() =>{
            setLoading(true)
            console.log("id",id)
            try{
                const response = await axios.get(`http://localhost:3000/api/employee/${id}`,{
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response.data.success){
                    setDetail(response.data.employee)
                    setName(response.data.employee.userId.name)
                    setEmail(response.data.employee.userId.email)
                    setRole(response.data.employee.userId.role)
                    setID(response.data.employee.employee_id)
                    setDOB( new Date(response.data.employee.date_of_birth).toDateString())
                    setGender(response.data.employee.gender)
                    setMarital(response.data.employee.marital_status)
                    setDesignation(response.data.employee.designation)
                    setCreated(response.data.employee.createdAt)
                    setDepartment(response.data.employee.department.dept_name)
                    setImage(response.data.employee.userId.profileImage)
                }
            }catch(error){
                if(error && !error.response.data.error){
                    alert(error.response.data.error)
                }
            }finally{
                setLoading(false)
            }
        }

        fetchEmployee();
    },[])
  return (
    <>{loading ? <div>Loading....</div> :
        <div className='h-full'>
            <div className='w-full bg-gray-700   p-8  shadow-md'>
                <h3 className='text-2xl font-bold mb-5 text-center text-white'>Employee Information</h3>
                <EmployeeIDCard employee={{id:id , name:name ,department:department ,designation:designation,image:image}} />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor='name' className='font-medium text-gray-400'>Name : </label>
                        <input type='text' value={name}  className='px-3 py-2 shadow-md bg-gray-800 text-gray-400 rounded-md w-full'></input>
                    </div>

                    <div>
                        <label htmlFor='email' className='font-medium text-gray-400'>e-mail : </label>
                        <input type='text' value={email}  className='px-3 py-2 shadow-md  w-full bg-gray-800 text-gray-400 rounded-md'></input>
                    </div>

                    <div>
                        <label htmlFor='role' className='font-medium text-gray-400'>Role : </label>
                        <input type='text' value={role}  className='px-3 py-2 shadow-md w-full bg-gray-800 text-gray-400 rounded-md'></input>
                    </div>

                    <div>
                        <label htmlFor='em_id' className='font-medium text-gray-400'>Employee Id : </label>
                        <input type='text' value={employee_id}  className='px-3 py-2 shadow-md w-full bg-gray-800 text-gray-400 rounded-md'></input>
                    </div>

                    <div>
                        <label htmlFor='dob' className='font-medium text-gray-400'>Date of Birth : </label>
                        <input type='text' value={dob}  className='px-3 py-2 shadow-md w-full bg-gray-800 text-gray-400 rounded-md'></input>
                    </div>

                    <div>
                        <label htmlFor='gender' className='font-medium text-gray-400'>Gender : </label>
                        <input type='text' value={gender}  className='px-3 py-2 shadow-md w-full bg-gray-800 text-gray-400 rounded-md'></input>
                    </div>

                    <div>
                        <label htmlFor='marital' className='font-medium text-gray-400'>Marital status : </label>
                        <input type='text' value={maritalStat}  className='px-3 py-2 shadow-md w-full bg-gray-800 text-gray-400 rounded-md'></input>
                    </div>

                    <div>
                        <label htmlFor='designation' className='font-medium text-gray-400'>Designation : </label>
                        <input type='text' value={designation}  className='px-3 py-2 shadow-md w-full bg-gray-800 text-gray-400 rounded-md'></input>
                    </div>

                    <div>
                        <label htmlFor='department' className='font-medium text-gray-400'>Department : </label>
                        <input type='text' value={department}  className='px-3 py-2 shadow-md w-full bg-gray-800 text-gray-400 rounded-md'></input>
                    </div>

                    <div>
                        <label htmlFor='created' className='font-medium text-gray-400'>Created At : </label>
                        <input type='text' value={created}  className='px-3 py-2 shadow-md w-full bg-gray-800 text-gray-400 rounded-md'></input>
                    </div>
                </div>
                
            </div>
        </div>
    }</>
  )
}

export default ViewEmployee
