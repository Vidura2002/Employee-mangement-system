import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { fetchDept } from '../utils/employeeHelper';

const LeaveList = () => {

    const [departments,setDepartments] = useState([]);
    const [loading,setLoading] = useState(false);
    const [selectedDept,setDept] = useState("");

    useEffect(()=>{
        const gettingDept = async() =>{
            const dept = await fetchDept();
            setDepartments(dept);
        }
        gettingDept();
    },[])
  return (
    <>{loading ? <div>Loading...</div> :
    <div className='p-5'>
      <div className='flex flex-row justify-center items-center'>
        <h3 className='text-2xl font-bold'>Employee Leaves</h3>
      </div>

      <div className='flex flex-row justify-between px-5 mt-3'>
        <div>
            <input type='text' placeholder='search by name' className='px-5 py-1 shadow rounded'></input>
        </div>
        <div>
            <select className='px-5 py-1 shadow rounded' onChange={(event)=>{setDept(event.target.value)}}>
                <option value=" ">Select department</option>
                {departments.map((item,index)=>(
                    <option value={item._id} key={index}>{item.dept_name}</option>
                ))}
            </select>
        </div>
      </div>

        <div className='mt-4'>
            <DataTable/>
        </div>
     
    </div>
}
    </>
  )
}

export default LeaveList
