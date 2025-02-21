import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Errormessage, Successmessage } from '../utils/message'

const AddDepartment = () => {

  const [department,setDepartment]=useState("")
  const [description,setDescription]=useState("")

  const [success,setSuccess] = useState("")
  const [error,setError] = useState("")

  const navigate=useNavigate()

  const handleSubmit= async(e)=>{
    e.preventDefault()

    try{
      console.log(department,description)
      const response= await axios.post("http://localhost:3000/api/department/add",
        {department,description},
        {headers:{
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }}
      )
      if(response.data.success){
        setSuccess(response.data.message)
        setTimeout(()=>{
          navigate("/admin-dashboard/departments")
        },5000)
        
      }
    }catch(error){
      console.log(error)
      if(error && !error.response.data.error){
        setError(error.response.data.error)
      }
    }

  }

  return (
    <div className='w-full  bg-gray-700 p-8 h-full shadow-md w-96'>
        <h3 className='text-2xl font-bold mb-6 text-gray-300'>Add Department</h3>
        <form onSubmit={handleSubmit}> 
          <div>
            <label htmlFor='dept_name' className='text-sm font-medium text-gray-300'>Department Name</label>
            <input 
              type='text' 
              placeholder='Enter dept name' 
              onChange={(event)=>{setDepartment(event.target.value)}}
              className='mt-1 w-full p-2 border text-gray-300 bg-gray-800 rounded-md'>
            </input>
          </div>
          <div className='mt-5'>
            <label htmlFor='description' className='text-sm font-medium text-gray-300'>Description</label>
            <textarea 
              name='description' 
              placeholder='Description' 
              onChange={(event)=>{setDescription(event.target.value)}}
              className='mt-1 w-full p-2 block border text-gray-300 bg-gray-800 rounded-md' rows="4">
            </textarea>
          </div>
          <button type='submit' className='w-full mt-6 bg-purple-600 font-bold hover:bg-purple-700 text-white py-2 px-4 rounded-md'>Add department</button>
        </form>

        {/* {success && <Successmessage message={success}/>}  */}
        {/* {error && <Errormessage message={error}/>} */}

    </div>
  )
}

export default AddDepartment
