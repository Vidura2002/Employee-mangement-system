import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { emColumns, EmployeeButtons } from '../utils/employeeHelper'
import axios from 'axios'


const EmployeeList = () => {
  const [employees,setEmployees]=useState([])
  const [filterEm,setFilterEmployees]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{

    const fetchEmployees = async() =>{
      setLoading(true)
      try{
        const response = await axios.get("http://localhost:3000/api/employee/getEmployees",
          {
            headers:{
              "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
        if(response.data.success){
          console.log(response.data.employees)
          let sno =1
          const data = await response.data.employees.map((em)=>(
            {
              _id:em._id,
              sno:sno++,
              name:em.userId.name,
              employee_id:em.employee_id,
              department:em.department.dept_name,
              Birthday :new Date(em.date_of_birth).toDateString(),
              action:(<EmployeeButtons _id={em._id}/>)
            }
          ))
          setEmployees(data)
          setFilterEmployees(data)
        }
      }catch(error){
        if(error && !error.response.data.error){
          console.log(error)
          alert(error.response.data.error)
        }
      }finally{
        setLoading(false)
      }
    }
    fetchEmployees();
  },[])

  const filterEmployees = (e) =>{
      const filterData = employees.filter((em)=>em.employee_id.includes(e.target.value))
      setFilterEmployees(filterData)
  }

  return (
    <>{loading ? <div>Loading........</div> :
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employee</h3>
      </div> 

      <div className='flex justify-between items-center '>
        <input type='text' placeholder='search by employee id' className='border px-4 py-0.5' onChange={filterEmployees}></input>
        <Link to="/admin-dashboard/add-employee" className='bg-teal-600 px-4 py-1 text-white rounded-md'>Add new employee</Link>
      </div>

      <div className='mt-5'>
        <DataTable
        pagination
        columns={emColumns}
        data={filterEm}
        />
      </div>

    </div>

    
  }</>
  )
}

export default EmployeeList
