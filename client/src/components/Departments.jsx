import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns } from '../utils/departmentColumn'
import axios from 'axios'
import { DepartmentButtons } from '../utils/departmentColumn'

const Departments = () => {

  const [departments,setDepartments]=useState([])
  const [loading,setLoading]=useState(false)
  const [filterDept,setFilterDept]=useState([])

  useEffect(()=>{
    const fetchDepartment = async() =>{
      setLoading(true)
      try{
        const response= await axios.get("http://localhost:3000/api/department",{
          headers:{
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
          }
        })
        if(response.data.success){
          let sno = 1;
          const data= await response.data.departments.map((dep)=>(
            {
              _id: dep._id,
              sno: sno++,
              dept_name:dep.dept_name,
              action:(<DepartmentButtons  _id={dep._id}/>)
            }
          ))
          setDepartments(data)
          setFilterDept(data)
        }
      }catch(error){
        if(error && !error.response.data.error){
          alert(error.response.data.error)
        }
      }finally{
        setLoading(false)
      }
      
    }
    fetchDepartment()
  },[])

  const filterDepartment = (e) =>{
    const filterDep=departments.filter((dep)=>dep.dept_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterDept(filterDep)
  }

  const customStyles = {
    tableWrapper: {
      style: {
        borderRadius: '10px', // Rounded corners for the table wrapper
        overflow: 'hidden', // Ensures content respects the border radius
      },
    },
    table: {
      style: {
        backgroundColor: '#1F2937', // Black background for the table
        borderRadius:'10px'
      },
    },
    headRow: {
      style: {
        backgroundColor: '#1F2937', // Black background for the header row
        color: 'white', // White text for header
      },
    },
    rows: {
      style: {
        backgroundColor: '#1F2937', // Black background for rows
        color: '#D1D5DB', // White text for rows
      },
      highlightOnHoverStyle: {
        backgroundColor: 'gray', // Gray background on hover
        color: 'white',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#1F2937', // Black background for the pagination
        color: 'white', // White text for pagination items
      }
    }
  };

  return (
    <>{loading ? <div>Loading.......... </div> :
    <div className='p-5 bg-gray-700 h-full'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold text-white'>Manage Departments</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type='text' placeholder='search by name' className='px-4 py-1 bg-gray-800 rounded-md text-white' onChange={filterDepartment}></input>
        <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-purple-700 font-bold hover:bg-purple-800 text-white rounded'>Add new department</Link>
      </div>

      <div className='mt-5'>
        <DataTable
        columns={columns}
        data={filterDept}
        pagination
        customStyles={customStyles}
        />
      </div>
    </div>
    }</>
  )
}

export default Departments
