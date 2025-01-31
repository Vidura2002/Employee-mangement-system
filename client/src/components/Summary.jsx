import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaUser, FaUsers } from 'react-icons/fa'
import axios from 'axios'
import {Chart} from 'react-google-charts'


const Summary = () => {

  const [em_count,setEmCount] = useState(0);
  const [dept_count,setDeptCount] = useState(0);
  const [it_count,setIT] = useState(0);
  const [HR_count,setHR] = useState(0);
  const [iot_count,setIOT] = useState(0);
  const [security_count,setSecurity] = useState(0);
  const [management_count,setManagement] = useState(0);
  const [civil_count,setcivil] = useState(0);
  const [health_count,setHealth] = useState(0);
  const [male,setMale] = useState(0)
  const [female,setFemale] = useState(0)
  const [apply,setApply] = useState(0)
  const [approve,setApprove] = useState(0)
  const [reject,setReject] = useState(0)
  const [pending,setPending] = useState(0)
  const [loading,setLoading] = useState(false)
  const [salary,setSalary] = useState("")

  const data = [
    ["Task", "Hours per Day"],
    ["IT", it_count],
    ["Civil", civil_count],
    ["Management", management_count],
    ["Iot", iot_count],
    ["Health", health_count],
    ["HR",HR_count],
    ["Security",security_count]
  ];

  const data2 = [
    ["Task","Hours per day"],
    ["Male",male],
    ["Female",female]
  ]

  const options = {
    backgroundColor:"#1F2937",
    is3D:false,
    pieHole: 0.5,
    colors: ["#00ffff", "#9900ff", "#0004ff", "#7b3dff", "#d400ff"],
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        color: "#9CA3AF",
        fontSize: 14,
      }
    },
  }

  const options2 = {
    backgroundColor:"#1F2937",
    is3D:true,
    colors: ["#00ffff", "#9900ff", "#0004ff", "#7b3dff", "#d400ff"],
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        color: "#9CA3AF",
        fontSize: 14,
      }
    },
  }

  useEffect(()=>{
    const getCount = async() =>{
      try{
        setLoading(true)
        const response = await axios.get("http://localhost:3000/api/dashboard",{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        if(response.data.success){
          setEmCount(response.data.employee_count);
          setDeptCount(response.data.dept_count)
          setIT(response.data.it_count)
          setHR(response.data.HR_count)
          setIOT(response.data.iot_count)
          setSecurity(response.data.security_count)
          setManagement(response.data.management_count)
          setcivil(response.data.civil_count)
          setHealth(response.data.health_count)
          setMale(response.data.male)
          setFemale(response.data.female)
          setApply(response.data.apply)
          setApprove(response.data.approve)
          setPending(response.data.pending)
          setReject(response.data.reject)
          setSalary(response.data.totalSalary)
        }
      }catch(error){
        console.error("Error :",error)
      }finally{
        setLoading(false)
      }
    }
    getCount();
  },[])
  return (
    <>{loading ? <div>Loading</div> : 
      <div className='p-6 bg-gray-700 '>
        <h3 className='text-2xl font-bold text-white'>Dashboard overview</h3>

        
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-6'>
            <SummaryCard icon={<FaUsers/>} text={"Employees"} count={em_count} color={'bg-gray-800'}/>
            <SummaryCard icon={<FaBuilding/>} text={"Departments"} count={dept_count} color={"bg-gray-800"}/>
            <SummaryCard icon={<FaMoneyBillWave/>} text={"Total Salary"} count={salary} color={"bg-gray-800"}/>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
            <div className="mt-5 flex flex-wrap p-2 shadow-md shadow-purple-500 rounded-lg bg-gray-800">
              <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width={"100%"}
              height={"300px"}
              />
            </div>

            <div className="mt-5 flex flex-wrap p-2 shadow-md shadow-purple-500 rounded-lg bg-gray-800">
              <Chart
              chartType="PieChart"
              data={data2}
              options={options2}
              width={"100%"}
              height={"300px"}
              />
            </div>
          </div>
        
        

        <h3 className='text-2xl font-bold mt-12 flex items-center justify-center text-white'>Leave Details</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6' >
          <SummaryCard icon={<FaFileAlt/>} text={"Leave Applied"} count={apply} color={'bg-gray-800'}/>
          <SummaryCard icon={<FaCheckCircle/>} text={"Leave Approved"} count={approve} color={'bg-gray-800'}/>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6' >
          <SummaryCard icon={<FaHourglassHalf/>} text={"Leave Pending"} count={pending} color={'bg-gray-800'}/>
          <SummaryCard icon={<FaCheckCircle/>} text={"Leave Rejected"} count={reject} color={'bg-gray-800'}/>
        </div>


      </div>
}
    </>
  )
}

export default Summary
