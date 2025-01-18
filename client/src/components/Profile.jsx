import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { fetchDept } from '../utils/employeeHelper'
import { useAuth } from '../context/authContext'
import { Errormessage, Successmessage } from '../utils/message'
import logo from '../assets/images/profile.jpg'

const Profile = () => {

    const {user} = useAuth();
    let employee_id;
    const [loading,setLoading] = useState(false)
    const [successMessage ,setSuccess] = useState("")
    const [errorMessage,setError] = useState("")

    const [departments,setDepartments]=useState([])
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [marital,setMarital]=useState("")
    const [designation,setDesignation]=useState("")
    const [department,setDepartment]=useState("")
    const [salary,setSalary]=useState("")
    const [image,setImage]=useState("")

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
          const response = await axios.put("http://localhost:3000/api/user/updateprofile",
            {employee_id,id:user._id,name,email,marital,designation,salary},
            {
              headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
              }
            }
          )
          if(response.data.success){
            setSuccess(response.data.message)
          }
        }catch(error){
          if(error && !error.response.data.error){
            setError(error.response.data.error)
          }
        }
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
    <div className='max-full bg-gray-700 p-8  shadow-md h-full font-sans '>
      <h2 className='text-2xl font-bold mb-6 text-white'>Edit Employee Details</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 mb-5'>
        <div className='flex flex-row items-center gap-8 text-gray-300 font-bold shadow-lg px-4 py-1 italic rounded-md'>
          <img src={logo} alt='profile'className='size-48 rounded-full shadow-md'/>
          <div>
            <p>Department : IT</p>
            <p>Gender : Male</p>
            <p>Birthday : 2002/09/27</p>
          </div>
        </div>
       
        <div className='flex flex-row'>
          <div className='bg-gray-700 w-64 ml-16 mt-2 rounded-md shadow-md shadow-gray-300 py-4 flex flex-col items-center justify-center text-gray-300 font-bold'>
            <p className='text-xl'>Total Leaves</p>
            <p className='text-2xl'>8</p>
          </div>
          <div className='bg-gray-700  mt-2 rounded-md shadow-md shadow-gray-300 w-64 py-4 ml-16 flex flex-col items-center justify-center text-gray-300 font-bold'>
              <p className='text-xl'>Total Projects</p>
              <p className='text-2xl '>13</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="name">Name</label>
                <input type='text'
                name="name"
                value={name}
                onChange={(event)=>setName(event.target.value)}
                className='mt-1 p-2 block w-full shadow-md shadow-gray-300 bg-gray-700 text-white rounded-md'
                required
                ></input>
            </div>

            

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="email">e-mail</label>
                <input type='email'
                name="email"
                value={email}
                onChange={(event)=>setEmail(event.target.value)}
                className='mt-1 p-2 block w-full shadow-md shadow-gray-300 bg-gray-700 text-white rounded-md'
                required
                ></input>
            </div>

           

            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="marital">Marital status</label>
                <select
                name="marital status"
                value={marital}
                onChange={(event)=>setMarital(event.target.value)}
                className='mt-1 p-2 block w-full shadow-md shadow-gray-300 bg-gray-700 text-white rounded-md'
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
                className='mt-1 p-2 block w-full shadow-md shadow-gray-300 bg-gray-700 text-white rounded-md'
                required
                ></input>
            </div>

            
            <div>
                <label className='block text-sm font-medium text-gray-400' htmlFor="salary">Salary</label>
                <input type='number'
                name="salary"
                onChange={(event)=>setSalary(event.target.value)}
                value={salary}
                className='mt-1 p-2 block w-full shadow-md shadow-gray-300 bg-gray-700 text-white rounded-md'
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
                className='mt-1 p-2 block w-full shadow-md shadow-gray-300 bg-gray-700 text-white rounded-md'
                ></input>
            </div>

        </div>

        <button type='submit'
        className='w-40 bg-gray-800  text-black text-white mt-6 hover:bg-black font-bold px-4 py-2 rounded-md'
        >Save</button>
      </form>

      {successMessage && <Successmessage message={successMessage}/>}
      {errorMessage && <Errormessage message={errorMessage}/>}
    </div>

}</>
  )
}

export default Profile
