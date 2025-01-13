import React, { useEffect, useState } from 'react'
import Leave from './Leave'
import { useAuth } from '../context/authContext'
import axios from 'axios';

const LeaveHistory = () => {

    const {user} = useAuth();
    const [leaves ,setLeaves] = useState([]);
    const [loading,setLoading] = useState(false)
    
    useEffect(()=>{
        const fetchLeaves = async() =>{
            setLoading(true)
            try{
                const response = await axios.get(`http://localhost:3000/api/user/getLeaves/${user._id}`,
                    {
                        headers:{
                            "Authorization":`Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                if(response.data.success){
                    setLeaves(response.data.leaves)
                    setLeaves(response.data.leaves)
                }
            }catch(error){
                if(error && !error.response.data.error){
                    console.error("Error",error.response.data.error)
                }
            }finally{
                setLoading(false)
            }
        }
        fetchLeaves();
    },[])

  return (
    <>{loading ? <div>Loading</div> : 
        <div className='bg-gray-700 h-full pt-5'>
            {leaves.map((item,index)=>(
                <Leave reason={item.reason} type={item.type} decision={item.decision} leave_date={new Date(item.leave_date).toDateString()} req_date={ new Date(item.requestedAt).toDateString()}/>
            ))}
        </div>
    }
    </>
  )
}

export default LeaveHistory
