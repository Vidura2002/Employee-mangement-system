import React, { useEffect, useState } from 'react'
import { fetchDept } from '../utils/employeeHelper'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddEmployee = () => {
    const [departments,setDepartments]=useState([])
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [id,setId]=useState("")
    const [dob,setDob]=useState("")
    const [gender,setGender]=useState("")
    const [marital,setMarital]=useState("")
    const [designation,setDesignation]=useState("")
    const [department,setDepartment]=useState("")
    const [salary,setSalary]=useState("")
    const [password,setPassword]=useState("")
    const [role,setRole]=useState("")
    const [image,setImage]=useState("")

    const navigate = useNavigate()

    useEffect(()=>{
        const fetcDepartments = async() =>{
            const getDeparments= await fetchDept()
            setDepartments(getDeparments)
        }
        fetcDepartments();
    },[])

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:3000/api/employee/add",
                {name,email,id,dob,gender,marital,designation,department,salary,password,role,image},
                {
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            if(response.data.success){
                navigate("/admin-dashboard/employee")
            }
        }catch(error){
            console.log(error)
            if(error && !error.response.data.error){
                alert(error.response.data.error)
            }
        }
    }

  return (
    <div className='max-full bg-gray-700 p-8  shadow-md '>
      <h2 className='text-2xl font-bold mb-6 text-white'>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="name">Name</label>
                <input type='text'
                name="name"
                placeholder='insert your name'
                onChange={(event)=>setName(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required
                ></input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="email">e-mail</label>
                <input type='email'
                name="email"
                placeholder='insert your email'
                onChange={(event)=>setEmail(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required
                ></input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="employee-id">Employee ID</label>
                <input type='text'
                name="employee id"
                placeholder='insert employee id'
                onChange={(event)=>setId(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required
                ></input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="birth day">Date of birth</label>
                <input type='date'
                name="birth day"
                onChange={(event)=>setDob(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-gray-400 rounded-md'
                required
                ></input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="email">Gender</label>
                <select
                name="gender"
                onChange={(event)=>setGender(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-gray-400 rounded-md'
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
                onChange={(event)=>setMarital(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-gray-400 rounded-md'
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
                placeholder='Designation'
                className='mt-1 p-2 block w-full border bg-gray-800 text-white rounded-md'
                required
                ></input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="dapartment">Department</label>
                <select
                name="department"
                onChange={(event)=>setDepartment(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-gray-400 rounded-md'
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
                placeholder='200000.00'
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
                onChange={(event)=>setRole(event.target.value)}
                className='mt-1 p-2 block w-full border bg-gray-800 text-gray-400 rounded-md'
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
        >Add Employee</button>
      </form>
    </div>
  )
}

export default AddEmployee
