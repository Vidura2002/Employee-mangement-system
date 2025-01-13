import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaBuilding, FaCalendarAlt, FaCogs, FaCommentDots, FaMoneyBillWave, FaTachometerAlt, FaUser, FaUsers} from "react-icons/fa"

const SideBar2 = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-purple-700 h-12 flex items-center justify-center'>
        <h3 className='text-2xl text-center font-mono font-bold'>Employee MS</h3>
      </div>
      <div className='px-4'>
        <NavLink to="/employee-dashboard" className={({isActive}) =>`${isActive ? "bg-purple-500":" "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
            <FaTachometerAlt/>
            <span>Profile</span>
        </NavLink>

        <NavLink to="/employee-dashboard/leaverequest" className={({isActive})=>`${isActive ? "bg-purple-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaUsers/>
            <span>Leave Request</span>
        </NavLink>

        <NavLink to="/employee-dashboard/leavehistory" className={({isActive}) => `${isActive ? "bg-purple-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaCommentDots/>
            <span>Leave History</span>
        </NavLink>

        <NavLink to="/" className={({isActive}) => `${isActive ? "bg-purple-500": " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaCalendarAlt/>
            <span>Message</span>
        </NavLink>

        <NavLink to="/" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
            <FaCogs/>
            <span>Settings</span>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar2
