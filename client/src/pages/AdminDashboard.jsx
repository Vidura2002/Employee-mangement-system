import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Summary from '../components/Summary'


const AdminDashboard = () => {

  const {user,loading}=useAuth()
  const navigate=useNavigate()

  if(loading){
    return <div>Loading...........</div>
  }

  if(!user){
    navigate('/login')
  }
  return (
    <div className='flex'>
      <SideBar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
       <NavBar/>
       <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard
