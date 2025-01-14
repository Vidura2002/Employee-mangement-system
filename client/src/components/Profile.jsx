import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { fetchDept } from '../utils/employeeHelper'
import { useAuth } from '../context/authContext'

const Profile = () => {

    const {user} = useAuth();
    const [loading,setLoading] = useState(false)

    const [departments,setDepartments]=useState([])
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [em_id,setId]=useState("")
    const [dob,setDob]=useState("")
    const [gender,setGender]=useState("")
    const [marital,setMarital]=useState("")
    const [designation,setDesignation]=useState("")
    const [department,setDepartment]=useState("")
    const [salary,setSalary]=useState("")
    const [role,setRole]=useState("")
    const [password,setPassword]=useState("");
    const [image,setImage]=useState("")

    const handleSubmit = () =>{

    }

    useEffect(()=>{
        setLoading(true)
        const getEmId = async() =>{
          try{
            const response = await axios.get(`http://localhost:3000/api/employee/getEmId/${user._id}`,
              {
                headers:{
                  "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
              }
            )
            if(response.data.success){
              setId(response.data.id)
            }
          }catch(error){
            if(error && !error.response.data.error){
              console.log("Error :",error.response.data.error)
            }
          }
        }

        const fetchData = async() =>{
            try{
                fetcDepartments();
                const response = await axios.get(`http://localhost:3000/api/employee/${em_id}`,
                    {
                        headers:{
                            "Authorization" : `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                if(response.data.success){
                    setName(response.data.employee.userId.name)
                    setEmail(response.data.employee.userId.email)
                    setId(response.data.employee.employee_id)
                    setDob(response.data.employee.date_of_birth)
                    setGender(response.data.employee.gender)
                    setMarital(response.data.employee.marital_status)
                    setDesignation(response.data.employee.designation)
                    setDepartment(response.data.employee.department.dept_name)
                    setSalary(response.data.employee.salary)
                    setRole(response.data.employee.role)
                
                }
            }catch(error){
                if(error && !error.response.data.error){
                    alert(error.response.data.error)
                }
            }
        }

        const fetcDepartments = async() =>{
            const getDeparments= await fetchDept()
            setDepartments(getDeparments)
        }
        getEmId()
        fetchData()
        setLoading(false)
    },[])
  return (
    <>{loading ? <div>Loading....</div> :
    <div className='max-full bg-gray-700 p-8  shadow-md '>
      <h2 className='text-2xl font-bold mb-6 text-white'>Edit Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="name">Name</label>
                <input type='text'
                name="name"
                value={name}
                onChange={(event)=>setName(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required
                ></input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="email">e-mail</label>
                <input type='email'
                name="email"
                value={email}
                onChange={(event)=>setEmail(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required
                ></input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="employee-id">Employee ID</label>
                <input type='text'
                name="employee id"
                value={em_id}
                onChange={(event)=>setId(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required
                ></input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="birth day">Date of birth</label>
                <input type='date'
                name="birth day"
                value={dob}
                onChange={(event)=>setDob(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required
                ></input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="email">Gender</label>
                <select
                name="gender"
                value={gender}
                onChange={(event)=>setGender(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required>
                    <option value=''>Select gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                </select>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="marital">Marital status</label>
                <select
                name="marital status"
                value={gender}
                onChange={(event)=>setMarital(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required>
                    <option value=''>Select status</option>
                    <option value='single'>Single</option>
                    <option value='married'>Married</option>
                </select>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="designation">Designation</label>
                <input type='text'
                name="designation"
                onChange={(event)=>setDesignation(event.target.value)}
                value={designation}
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required
                ></input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="dapartment">Department</label>
                <select
                name="department"
                value={department}
                onChange={(event)=>setDepartment(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required>
                    <option value=''>Select department</option>
                    {departments.map((dep)=>(
                        <option key={dep._id} value={dep._id}>{dep.dept_name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="salary">Salary</label>
                <input type='number'
                name="salary"
                onChange={(event)=>setSalary(event.target.value)}
                value={salary}
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required
                ></input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="password">Password</label>
                <input type='password'
                name="password"
                onChange={(event)=>setPassword(event.target.value)}
                placeholder='************'
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required
                ></input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="role">Role</label>
                <select
                name="role"
                value={role}
                onChange={(event)=>setRole(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required>
                    <option className=''>Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                </select>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="image">Upload Image</label>
                <input type='file'
                name="image"
                onChange={(event)=>setImage(event.target.value)}
                placeholder='upload image'
                accept='/image/*'
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                ></input>
            </div>

        </div>

        <button type='submit'
        className='w-full bg-purple-600 text-white mt-6 hover:bg-purple-700 font-bold px-4 py-2 rounded-md'
        >Edit Employee Detail</button>
      </form>
    </div>
}</>
  )
}

export default Profile
