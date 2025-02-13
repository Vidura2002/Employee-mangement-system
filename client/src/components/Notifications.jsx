import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { set } from 'mongoose';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';

const Notifications = () => {

    const {user} = useAuth();
    const [Notifications,setNotifications] = useState([])
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{

        const fetchNotifications = async()=> {
            setLoading(true)
            try{
                const response = await axios.get(`http://localhost:3000/api/user/fetchnotifications/${user._id}`,{
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response.data.success){
                    setNotifications(response.data.notifications)
                }
            }catch(error){
                if(error && !error.response.data.error){
                    alert(error.response.data.error)
                }
            }finally{
                setLoading(false)
            }
        }
        fetchNotifications();
    },[])

    const clickNotification = async(id)=>{
        try{
            const response = await axios.put(`http://localhost:3000/api/user/clicknotification`,
                {id},
                {
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            if(response.data.success){
                if(user.role === "admin"){
                    navigate("/admin-dashboard/leaves")
                }else{
                    navigate("/employee-dashboard/leavehistory")
                }
                
            }
        }catch(error){
            if(error && !error.response.data.error){
                alert(error.response.data.error)
            }
        }
       
    }
  return (
    <>{loading ? <div>Loading....</div> :
        <div className='p-4 bg-gray-700 h-full'>
            <div>
                <h3 className='text-2xl font-bold text-gray-300'>Notifications</h3>
            </div>

            {Notifications.map((notification,index)=>(
                <div 
                className={`flex flex-row justify-between ${notification.seen === true ? 'bg-gray-600' : 'bg-gray-800'} px-5 py-3 mb-0.5 mt-5 rounded shadow-md cursor-pointer hover:shadow-gray-500`}
                onClick={()=>clickNotification(notification._id)}
                >
                    <div className='text-gray-300 flex flex-row gap-2 items-center'><FaPaperPlane/><div>{notification.message}</div></div>
                    <div className='text-sm font-medium text-gray-200'> {notification.date}</div> 
                </div>
            ))}
        </div>
    }
    </>
  )
}

export default Notifications
