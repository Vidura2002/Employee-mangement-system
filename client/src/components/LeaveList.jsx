import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { fetchDept } from '../utils/employeeHelper';
import { useAuth } from '../context/authContext';
import { data } from 'react-router-dom';
import { LeaveButtons, Leavecolumns } from '../utils/leaveHelper';

const LeaveList = () => {

    const [departments,setDepartments] = useState([]);
    const [loading,setLoading] = useState(false);
    const [selectedDept,setDept] = useState("");
    const [leaves,setLeaves] = useState([])
    const [filterLeaves,setFilterLeaves] = useState([])

    const {user} = useAuth();
    const admin_id = user._id;

    useEffect(()=>{
        const gettingDept = async() =>{
            const dept = await fetchDept();
            setDepartments(dept);
        }

        const gettingLeaves = async() =>{
          try{
            const response = await axios.get(`http://localhost:3000/api/user/${admin_id}`,
                {
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            if(response.data.success){
              console.log(response.data.leaves)
                let sno = 1;
                const data = response.data.leaves.map((leav)=>(
                  {
                    _id:leav._id,
                    sno:sno++,
                    reason:leav.reason,
                    name:leav.user_id.name,
                    date:new Date (leav.leave_date).toDateString(),
                    action:(<LeaveButtons _id={leav._id}/>)
                  }
                ))
                setLeaves(data);
                setFilterLeaves(data)
            }
          }catch(error){
            alert(error?.response?.data.error);
          }
        }
        gettingLeaves();
        gettingDept();
    },[])

    const filterName = (e) =>{
      const filterData = leaves.filter((leav)=>leav.name.toLowerCase().includes(e.target.value.toLowerCase()))
      setFilterLeaves(filterData)
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
    <>{loading ? <div>Loading...</div> :
    <div className='p-5 bg-gray-700 h-full'>
      <div className='flex flex-row justify-center items-center'>
        <h3 className='text-2xl font-bold text-white'>Employee Leaves</h3>
      </div>

      <div className='flex flex-row justify-between px-5 mt-3'>
        <div>
            <input type='text' placeholder='search by name' 
            className='px-5 py-1 shadow rounded bg-gray-800 text-white'
            onChange={filterName}
            ></input>
        </div>
        <div>
            <select className='px-5 py-1 shadow rounded bg-gray-800 text-gray-300' value={selectedDept} onChange={(event)=>{setDept(event.target.value)}}>
                <option value=" " >Select department</option>
                {departments.map((item,index)=>(
                    <option value={item._id} key={index}>{item.dept_name}</option>
                ))}
            </select>
        </div>
      </div>

        <div className='mt-4'>
            <DataTable
            columns={Leavecolumns}
            data={filterLeaves}
            customStyles={customStyles}
            pagination
            />
        </div>
     
    </div>
}
    </>
  )
}

export default LeaveList
