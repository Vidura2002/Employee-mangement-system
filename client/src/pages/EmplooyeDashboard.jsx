import React from 'react'
import NavBar from '../components/NavBar'
import SideBar2 from '../components/SideBar2'
import { Outlet } from 'react-router-dom'

const EmplooyeDashboard = () => {
  console.log("rendering...")
  return (
    <div className='flex'>
      <SideBar2/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <NavBar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default EmplooyeDashboard
