import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState(null)
    const {login}=useAuth()
    const navigate = useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response=axios.post("http://localhost:3000/api/auth/login",
                {email,password}
            );
            if((await response).data.success){
                login((await response).data.user)
                localStorage.setItem("token",(await response).data.token)
                if((await response).data.user.role==="admin"){
                    navigate('/admin-dashboard')
                }else{
                    navigate('/employee-dashboard');
                }
            }
        }catch(error){
            if(error.response && !error.response.data.success){
                setError(error.response.data.error)
            }else{
                setError("server error")
                console.log(error)
            }
        }
    }

  return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6'>
      <h2 className='font-sevillana text-3xl text-white font-bold'>Employee Management system</h2>

      <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-3xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-600'>E-mail</label>
                <input 
                    type='email' 
                    placeholder="Enter email"
                    className='w-full px-3 py-2 border'
                    required
                    onChange={(event)=>{setEmail(event.target.value)}}>  
                </input>
            </div>

            <div className='mb-4'>
                <label htmlFor='password' className='block text-gray-600'>Password</label>
                <input 
                    type='password'
                    placeholder="*********"
                    className='w-full px-3 py-2 border'
                    required
                    onChange={(event)=>{setPassword(event.target.value)}}>
                </input>
            </div>

            <div className='mb-4 flex items-center justify-between'>
            <label className='inline-flex items-center'>
                <input type='checkbox' className='form-checkbox'/>
                <span className='ml-2 text-gray-700'>Remember me</span>
            </label>
            <a href='#' className='text-teal-600'>Forgot password</a>
            </div>

            <div className='mb-4'>
                <button
                    type="submit"
                    className='w-full bg-teal-600 text-white py-2 rounded-xl'
                >Login</button>
                {error && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 my-2 rounded relative'>
                    <p className='block sm:inline '>{error}</p>
                </div>}
                
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
