import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditDepartment = () => {
    const {id}=useParams();
    const [dept_name,setDepartment]=useState("")
    const [description,setDescription]=useState("")
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()

    useEffect(()=>{
        const get=async()=>{
            try{
                setLoading(true)
                const response=await axios.get(`http://localhost:3000/api/department/${id}`,{
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response.data.success){
                    console.log(response.data.department.dept_name)
                    setDepartment(response.data.department.dept_name)
                    setDescription(response.data.department.description)
                }
            }catch(error){
                if(error && !error.response.data.error){
                    alert(error.response.data.error)
                }
            }finally{
                setLoading(false)
            }
            
        }
        get()
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response= await axios.put("http://localhost:3000/api/department/edit",
                {id,dept_name,description},
                {headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }}
            )
            if(response.data.success){
                navigate("/admin-dashboard/departments")
            }
        }catch(error){
            if(error && !error.response.data.error){
                alert(error.response.data.error)
            }
        }

    }
  return (
    <>{loading ? <div>loading</div> :
    <div className='w-full bg-gray-700 p-8 shadow-md h-full'>
        <h3 className='text-2xl font-bold mb-6 text-white'>Edit Department</h3>
        <form onSubmit={handleSubmit}> 
          <div>
            <label htmlFor='dept_name' className='text-sm font-medium text-gray-300'>Department Name</label>
            <input 
              type='text' 
              placeholder='Enter dept name' 
              value={dept_name}
              onChange={(event)=>{setDepartment(event.target.value)}}
              className='mt-1 w-full p-2 border text-gray-400 bg-gray-800 rounded-md'>
            </input>
          </div>
          <div className='mt-5'>
            <label htmlFor='description' className='text-sm font-medium text-gray-300'>Description</label>
            <textarea 
              name='description' 
              placeholder='Description' 
              value={description}
              onChange={(event)=>{setDescription(event.target.value)}}
              className='mt-1 w-full p-2 block border text-gray-400 bg-gray-800 rounded-md' rows="4">
            </textarea>
          </div>
          <button type='submit' className='w-full mt-6 bg-purple-600 hover:bg-purple-700 font-bold text-white py-2 px-4 rounded-md'>Edit department</button>
        </form>
    </div>
    }</>
  )
}

export default EditDepartment
