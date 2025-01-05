import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddDepartment = () => {

  const [department,setDepartment]=useState("")
  const [description,setDescription]=useState("")
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
        navigate("/admin-dashboard/departments")
      }
    }catch(error){
      console.log(error)
      if(error && !error.response.data.error){
        alert(error.response.data.error)
      }
    }

  }

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h3 className='text-2xl font-bold mb-6'>Add Department</h3>
        <form onSubmit={handleSubmit}> 
          <div>
            <label htmlFor='dept_name' className='text-sm font-medium text-gray-700'>Department Name</label>
            <input 
              type='text' 
              placeholder='Enter dept name' 
              onChange={(event)=>{setDepartment(event.target.value)}}
              className='mt-1 w-full p-2 border border-gray-300 rounded-md'>
            </input>
          </div>
          <div>
            <label htmlFor='description' className='text-sm font-medium text-gray-700'>Description</label>
            <textarea 
              name='description' 
              placeholder='Description' 
              onChange={(event)=>{setDescription(event.target.value)}}
              className='mt-1 w-full p-2 block border border-gray-300 rounded-md' rows="4">
            </textarea>
          </div>
          <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md'>Add department</button>
        </form>
    </div>
  )
}

export default AddDepartment
