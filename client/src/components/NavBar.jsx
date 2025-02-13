import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { red } from '@mui/material/colors';

const color= red[50]

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge}{
    top: -12px;
    right: -6px;
  }
`;


const NavBar = () => {
    const {user,logout}=useAuth()
    const navigate=useNavigate()
    const [count,setCount] =  useState("")
    const [loading,setLoading] =  useState(false)

    const Logout=()=>{
        logout()
        navigate("/login")
    }

    useEffect(()=>{

      const fetchCount = async()=>{
        setLoading(true)
        try{
          const response = await axios.get(`http://localhost:3000/api/user/notificationcount/${user._id}`,{
              headers:{
                  "Authorization":`Bearer ${localStorage.getItem("token")}`
              }
          })
          if(response.data.success){
              setCount(response.data.count)
          }
        }catch(error){
            if(error && !error.response.data.error){
                alert(error.response.data.error)
            }
        }finally{
            setLoading(false)
        }
        }
        fetchCount();
    },[])

    const navigateToNotifications = () =>{
      if(user.role === "admin"){
        navigate("/admin-dashboard/notifications")
      }else{
        navigate("/employee-dashboard/notifications")
      }
    }
    
  return (
    <>
    <div className='flex items-center text-white justify-between h-12 bg-purple-700 px-5'>
      <p className='py-2 px-4 font-bold'>Welcome {user.name}</p>

      <div className='flex flex-row gap-8 font-bold'>
        <IconButton onClick={()=>navigateToNotifications()}>
          <NotificationsIcon fontSize="small" />
          <CartBadge badgeContent={count} color="secondary" overlap="circular" />
        </IconButton>

        <button onClick={Logout} className='px-4 py-1 bg-gray-800 rounded font-medium hover:scale-110'>Logout</button>

      </div>
     
    </div>
  
    </>
  )
}

export default NavBar
