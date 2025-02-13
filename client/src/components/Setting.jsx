import { Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import { use } from 'react'
import { Errormessage, Successmessage } from '../utils/message'

const Setting = () => {

    const {user} = useAuth();
    const [currentpassword,setcurrent] = useState("")
    const [confirmpassword,setconfirm] = useState("")
    const [newpassword,setnew] = useState("")

    const [success,setSuccess] = useState("");
    const [error,setError] = useState("")

    const changePassword = async() =>{
        try{
            if(newpassword === confirmpassword && currentpassword){

                const response = await axios.put("http://localhost:3000/api/user/changepassword",
                    {currentpassword,newpassword,id:user._id},
                    {
                        headers:{
                            "Authorization":`Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                if(response.data.success){
                    setSuccess(response.data.message);
                }
                else{
                    setError(response.data.error)
                }

            }else if(currentpassword === "" | newpassword === "" | confirmpassword===""){
                setError(" please enter required fileds");
            }
            
            else{
                setError("Entered passwords are not same!")
            }
            
        }catch(error){
            if(error && !error.response.data.error){
                alert(error.response.data.error)
            }
        }
    }
  return (
    <div className='flex bg-gray-700 h-full py-2'>
      <div className='bg-gray-800 p-8 flex flex-col ml-4'>
        <h3 className='text-gray-300 text-lg font-bold mb-4'>Change your password</h3>
            <div className='flex flex-col'>
                <label htmlFor='current' className='text-gray-300'>Current password</label>
                <input 
                type='password' 
                placeholder='enter here' 
                required
                className='mb-4 px-2 py-2 rounded-md mt-1'
                onChange={(event)=>{setcurrent(event.target.value)}}
                ></input>

                <label htmlFor='current' className='text-gray-300'>New password</label>
                <input 
                type='password' 
                placeholder='enter here' 
                className='mb-4 px-2 py-2 rounded-md mt-1'
                required
                onChange={(event)=>{setnew(event.target.value)}}
                ></input>

                <label htmlFor='current' className='text-gray-300'>Confirm password</label>
                <input 
                type='password' 
                placeholde="**********" 
                required
                className='mb-8 px-2 py-2 rounded-md mt-1'
                onChange={(event)=>{setconfirm(event.target.value)}}
                ></input>

                <Button variant='contained' onClick={changePassword}>Change password</Button>
            </div>
      </div>

      {success && <Successmessage message={success}/>}
      {error && <Errormessage message={error}/>}
    </div>
  )
}

export default Setting
