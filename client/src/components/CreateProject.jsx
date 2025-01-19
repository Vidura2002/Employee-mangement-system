import { Button } from '@mui/material'
import React, { useState } from 'react'

const CreateProject = () => {

    const [title,setTitle] = useState("")
    const [department,setDepartment] = useState("")
    const [startDate,setStartDate] = useState("")
    const [leader,setLeader] = useState("")
    const [description,setDescription] = useState("")
    const [contributors,setContributors] = useState([])
  return (
    <div className='bg-gray-700 h-full p-4'>
      <div className='flex flex-row items-center justify-center'>
        <h3 className='text-3xl text-gray-300 font-bold'>Create New Project</h3>
      </div>

      <form >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8'>
            <div className='mt-2 flex flex-col gap-2'>
                <label htmlFor='title' className='text-gray-300 font-medium'>project title</label>
                <input type='text' onChange={(event)=>{setTitle(event.target.value)}} className='py-1.5 px-2 shadow-md rounded-md bg-gray-800 text-gray-300'></input>
            </div>

            <div className='mt-2 flex flex-col gap-2'>
                <label htmlFor='title' className='text-gray-300 font-medium'>select department</label>
                <select className='py-1.5 px-2 shadow-md rounded-md bg-gray-800 text-gray-300'>
                    <option>nothing right now</option>
                </select>
            </div>

            <div className='mt-2 flex flex-col gap-2'>
                <label htmlFor='title' className='text-gray-300 font-medium'>start date</label>
                <input type='date' onChange={(event)=>{setStartDate(event.target.value)}} className='py-1.5 px-2 shadow-md rounded-md bg-gray-800 text-gray-300'></input>
            </div>

            <div className='mt-2 flex flex-col gap-2'>
                <label htmlFor='title' className='text-gray-300 font-medium'>project leader</label>
                <select className='py-1.5 px-2 shadow-md rounded-md bg-gray-800 text-gray-300' onChange={(event)=>{setLeader(event.target.value)}}>
                    <option>nothing right now</option>
                </select>
            </div>
        </div>

        <div className='grid grid-cols-1'>
            <div className='mt-5 flex flex-col gap-2'>
                <label htmlFor='title' className='text-gray-300 font-medium'>description</label>
                <textarea onChange={(event)=>{setDescription(event.target.value)}} className='py-1.5 px-2 shadow-md rounded-md bg-gray-800 text-gray-300 h-20'></textarea>
            </div>

            <div className='mt-5 flex flex-col gap-2'>
                <label htmlFor='title' className='text-gray-300 font-medium'>project contributors</label>
                <select className='py-1.5 px-2 shadow-md rounded-md bg-gray-800 text-gray-300' >
                    <option>nothing right now</option>
                </select>
            </div>
        </div>

        <div className='mt-5'>
            <Button variant="contained">Create Project</Button>
        </div>
        
      </form>
    </div>
  )
}

export default CreateProject
