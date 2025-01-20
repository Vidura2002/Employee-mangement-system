import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchDept, fetchEmployee } from '../utils/employeeHelper'

const CreateProject = () => {

    const [title,setTitle] = useState("")
    const [department,setDepartment] = useState("")
    const [startDate,setStartDate] = useState("")
    const [leader,setLeader] = useState("")
    const [description,setDescription] = useState("")
    const [contributors,setContributors] = useState([])
    const [departments,setDepartments] = useState([])
    const [employees,setEmployess] = useState([])

    useEffect(()=>{
        const gettingDept = async() =>{
            const getDept = await fetchDept();
            setDepartments(getDept);
        }
        
        gettingDept();
    },[])

    const gettingEmployees = async(dept)=>{
        const getEmployees = await fetchEmployee(dept)
        setEmployess(getEmployees)
    }

    const handleSelect =(option)=>{
        if(contributors.includes(option)){
            setContributors(contributors.filter((item)=> item !== option))
        }
        else{
            setContributors([...contributors,option])
        }
    }

    const hari = ()=>{
        console.log(contributors)
    }

  return (
    <div className='bg-gray-700 h-full p-4'>
      <div className='flex flex-row items-center justify-center'>
        <h3 className='text-3xl text-gray-300 font-bold'>Create New Project</h3>
      </div>

      <form >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8'>
            <div className='mt-2 flex flex-col gap-2'>
                <label htmlFor='title' className='text-gray-300 font-medium'>project title</label>
                <input type='text' placeholder='enter project title here' onChange={(event)=>{setTitle(event.target.value)}} className='py-2 px-2 shadow-md rounded-md bg-gray-800 text-gray-300'></input>
            </div>

            <div className='mt-2 flex flex-col gap-2'>
                <label htmlFor='title' className='text-gray-300 font-medium'>select department</label>
                <select className='py-2.5 px-2 shadow-md rounded-md bg-gray-800 text-gray-300' value={department} onChange={(event)=>{setDepartment(event.target.value)}}>
                    <option value="">select department</option>
                    {departments.map((item,index)=>(
                        <option key={index} value={item._id}>{item.dept_name}</option>
                    ))}
                </select>
            </div>

            <div className=' flex flex-col gap-2'>
                <label htmlFor='title' className='text-gray-300 font-medium'>start date</label>
                <input type='date' onChange={(event)=>{setStartDate(event.target.value)}} className='py-2 px-2 shadow-md rounded-md bg-gray-800 text-gray-300'></input>
            </div>

            <div className=' flex flex-col gap-2'>
                <label htmlFor='title' className='text-gray-300 font-medium'>project leader</label>
                <select className='py-2.5 px-2 shadow-md rounded-md bg-gray-800 text-gray-300' onClick={()=>gettingEmployees(department)} onChange={(event)=>{setLeader(event.target.value)}}>
                    <option>first select department</option>
                    {employees && employees.map((item,index)=>(
                        <option key={index} value={item._id}>{item.userId.name}</option>
                    ))}
                </select>
            </div>
        </div>

        <div className='grid grid-cols-1'>
            <div className='mt-5 flex flex-col gap-2'>
                <label htmlFor='title' className='text-gray-300 font-medium'>description</label>
                <textarea placeholder='about project description' onChange={(event)=>{setDescription(event.target.value)}} className='py-2 px-2 shadow-md rounded-md bg-gray-800 text-gray-300 h-20'></textarea>
            </div>

            <div className='mt-5 flex flex-col gap-2'>
                <label htmlFor='title' className='text-gray-300 font-medium'>project contributors</label>
                <select className='py-2 px-2 shadow-md rounded-md bg-gray-800 text-gray-300' 
                onChange={(event) => {
                    const options = event.target.options;
                    for (const option of options) {
                        if (option.selected) {
                            handleSelect(option.value)
                        }
                    }
                }}
                onClick={()=>gettingEmployees(department)} >
                    <option>first select department</option>
                    {employees && employees.map((item,index)=>(
                        <option key={index} value={item._id}>{item.userId.name}</option>
                    ))}
                </select>
            </div>
        </div>

        <div className='mt-5'>
            <Button variant="contained" onClick={hari}>+ Create Project</Button>
        </div>
        
      </form>
    </div>
  )
}

export default CreateProject
