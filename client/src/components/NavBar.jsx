import React from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const {user,logout}=useAuth()
    const navigate=useNavigate

    const Logout=()=>{
        logout()
        navigate("/login")
    }
  return (
    <div className='flex items-center text-white justify-between h-12 bg-purple-700 px-5'>
      <p className='py-2 px-4 font-bold'>Welcome {user.name}</p>
      <button onClick={Logout} className='px-4 py-1 bg-gray-800 rounded font-medium hover:scale-110'>Logout</button>
    </div>
  )
}

export default NavBar
