import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { fetchDept } from '../utils/employeeHelper'
import { useAuth } from '../context/authContext'

const Profile = () => {

    const {user} = useAuth();
    let employee_id;
    const [loading,setLoading] = useState(false)

    const [departments,setDepartments]=useState([])
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [marital,setMarital]=useState("")
    const [designation,setDesignation]=useState("")
    const [department,setDepartment]=useState("")
    const [salary,setSalary]=useState("")
    const [image,setImage]=useState("")

    const handleSubmit = () =>{

    }

    useEffect(()=>{
        setLoading(true)

        const fetchData = async() =>{
            try{
                fetcDepartments();
                const response = await axios.get(`http://localhost:3000/api/employee/${employee_id}`,
                    {
                        headers:{
                            "Authorization" : `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                if(response.data.success){
                    setName(response.data.employee.userId.name)
                    setEmail(response.data.employee.userId.email)
                    setMarital(response.data.employee.marital_status)
                    setDesignation(response.data.employee.designation)
                    setDepartment(response.data.employee.department.dept_name)
                    setSalary(response.data.employee.salary)
                
                }
            }catch(error){
                if(error && !error.response.data.error){
                    alert(error.response.data.error)
                }
            }
        }

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
              //setId(response.data.id)
                employee_id = response.data.id;
                console.log(employee_id)
                fetchData()
            }
          }catch(error){
            if(error && !error.response.data.error){
              console.log("Error :",error.response.data.error)
            }
          }
        }


        const fetcDepartments = async() =>{
            const getDeparments= await fetchDept()
            setDepartments(getDeparments)
        }
        getEmId()
        setLoading(false)
    },[])
  return (
    <>{loading ? <div>Loading....</div> :
    <div className='max-full bg-gray-700 p-8  shadow-md h-full '>
      <h2 className='text-2xl font-bold mb-6 text-white'>Edit Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="name">Name</label>
                <input type='text'
                name="name"
                value={name}
                onChange={(event)=>setName(event.target.value)}
                className='mt-1 p-2 block w-full border-b border-l border-purple-400 bg-gray-700 text-white rounded-md'
                required
                ></input>
            </div>

            <div className='bg-gray-700 w-64 ml-16 mt-2 rounded-md shadow-md shadow-purple-400 py-4 flex flex-col items-center justify-center text-gray-300 font-bold'>
                <p className='text-2xl'>Total Leaves</p>
                <p className='text-3xl'>8</p>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="email">e-mail</label>
                <input type='email'
                name="email"
                value={email}
                onChange={(event)=>setEmail(event.target.value)}
                className='mt-1 p-2 block w-full border-b border-l border-purple-400 bg-gray-700 text-white rounded-md'
                required
                ></input>
            </div>

            <div className='bg-gray-700 font-sans mt-2 rounded-md shadow-md shadow-purple-400 w-64 py-4 ml-16 flex flex-col items-center justify-center text-gray-300 font-bold'>
                <p className='text-2xl'>Total Projects</p>
                <p className='text-3xl '>13</p>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="marital">Marital status</label>
                <select
                name="marital status"
                value={marital}
                onChange={(event)=>setMarital(event.target.value)}
                className='mt-1 p-2 block w-full border-b border-l border-purple-400 bg-gray-700 text-white rounded-md'
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
                className='mt-1 p-2 block w-full border-b border-l border-purple-400 bg-gray-700 text-white rounded-md'
                required
                ></input>
            </div>

            
            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="salary">Salary</label>
                <input type='number'
                name="salary"
                onChange={(event)=>setSalary(event.target.value)}
                value={salary}
                className='mt-1 p-2 block w-full border-b border-l border-purple-400 bg-gray-700 text-white rounded-md'
                required
                ></input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="image">Upload Image</label>
                <input type='file'
                name="image"
                onChange={(event)=>setImage(event.target.value)}
                placeholder='upload image'
                accept='/image/*'
                className='mt-1 p-2 block w-full border-b border-l border-purple-400 bg-gray-700 text-white rounded-md'
                ></input>
            </div>

        </div>

        <button type='submit'
        className='w-40 bg-white  text-black text-white mt-6 hover:bg-gray-300 font-bold px-4 py-2 rounded-md'
        >Save</button>
      </form>
    </div>
}</>
  )
}

export default Profile
