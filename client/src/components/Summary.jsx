import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaUser, FaUsers } from 'react-icons/fa'
import axios from 'axios'

const Summary = () => {

  const [em_count,setEmCount] = useState(0);
  const [dept_count,setDeptCount] = useState(0);

  useEffect(()=>{
    const getCount = async() =>{
      try{
        const response = await axios.get("http://localhost:3000/api/dashboard",{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        if(response.data.success){
          setEmCount(response.data.employee_count);
          setDeptCount(response.data.dept_count)
        }
      }catch(error){
        console.error("Error :",error)
      }
    }
    getCount();
  },[])
  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold'>Dashboard overview</h3>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FaUsers/>} text={"Employees"} count={em_count} color={'bg-teal-600'}/>
        <SummaryCard icon={<FaBuilding/>} text={"Departments"} count={dept_count} color={"bg-yellow-500"}/>
        <SummaryCard icon={<FaMoneyBillWave/>} text={"Total Salary"} count={"$780"} color={"bg-red-500"}/>
      </div>

      <h3 className='text-2xl font-bold mt-12 flex items-center justify-center'>Leave Details</h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6' >
        <SummaryCard icon={<FaFileAlt/>} text={"Leave Applied"} count={16} color={'bg-teal-600'}/>
        <SummaryCard icon={<FaCheckCircle/>} text={"Leave Approved"} count={5} color={'bg-green-500'}/>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6' >
        <SummaryCard icon={<FaHourglassHalf/>} text={"Leave Pending"} count={1} color={'bg-yellow-500'}/>
        <SummaryCard icon={<FaCheckCircle/>} text={"Leave Rejected"} count={2} color={'bg-red-500'}/>
      </div>


    </div>
  )
}

export default Summary
