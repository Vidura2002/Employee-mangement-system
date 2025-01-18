import React, { useEffect, useState } from 'react'
import { fetchAdmins } from '../utils/employeeHelper';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import {Errormessage, Successmessage } from '../utils/message';
import { use } from 'react';


const LeaveRequest = () => {
    const [admins,setAdmins] = useState([]);
    const [reason,setReason] = useState("");
    const [date,setDate] = useState("");
    const [receiver,setReceiver] = useState("");
    const [type,setType] = useState("");
    const {user} = useAuth();

    const [successmessage,setsuccessMsg] = useState("")
    const [errormessage,setErrorMessage] = useState("")

    useEffect(()=>{
        const gettingAdmins = async() =>{
            const recevied_admins = await fetchAdmins();
            setAdmins(recevied_admins);
        }
        gettingAdmins();
    },[])

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(reason,date,receiver,user)
        try{
            const response = await axios.post("http://localhost:3000/api/user/reqLeave",
                {reason,date,type,receiver,from:user._id},
                {
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            if(response.data.success){
                setsuccessMsg(response.data.message)
            }else{
                setErrorMessage(response.data.error)
            }
        }catch(error){
            if(error && !error.response.data.error){
                console.error("Error :",error.response.data.error)
            }
        }
    }

  return (
    <div className='px-5 shasow-md bg-gray-700   h-full'>
        <div className='flex flex-row items-center justify-center  py-1'>
            <h3 className='text-2xl text-white font-bold mt-3'>Leave Request</h3>
        </div>

        <form onSubmit={handleSubmit}>
        <div className='flex flex-col items-center justify-center mt-2 '>
                <div className='flex flex-col gap-2 mt-4 text-white'>
                    <label htmlFor='reason'>Enter your leave reason</label>
                    <textarea className='shadow-md bg-gray-700 rounded-md px-2 py-1 w-96 h-40' type='text' placeholder='mention your reason' 
                    value={reason}
                    onChange={(event)=>{setReason(event.target.value)}}
                    ></textarea>
                </div>

                <div className='flex flex-col gap-2 mt-5 text-white'>
                    <label htmlFor='to'>Select leave type</label>
                    <select className='shadow-md bg-gray-700 rounded-md px-2 py-1 w-96 ' type='date'
                    onChange={(event)=>{setType(event.target.value)}}
                    value={type}
                    >
                        <option value="">Select leave type</option>
                        <option value="Full Day">Full Day</option>
                        <option value="Half Day">Half Day</option>
                    </select>
                </div>

                <div className='flex flex-col gap-2 mt-5 text-white'>
                    <label htmlFor='date'>Leave required date</label>
                    <input className='shadow-md bg-gray-700 rounded-md px-2 py-1 w-96 ' type='date' 
                    value={date}
                    onChange={(event)=>{setDate(event.target.value)}}
                    ></input>
                </div>

                <div className='flex flex-col gap-2 mt-5 text-white'>
                    <label htmlFor='to'>To</label>
                    <select className='shadow-md bg-gray-700 rounded-md px-2 py-1 w-96 ' type='date'
                    onChange={(event)=>{setReceiver(event.target.value)}}
                    value={receiver}
                    >
                        <option value="">Select a receiver</option>
                        {admins.map((item,index)=>(
                            <option value={item._id} key={index}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <button type='submit' className='text-white font-bold bg-purple-700 rounded-md w-96 py-2 mt-8 hover:bg-purple-800'>Request a leave</button>
            </div>
        </form>
        {successmessage && <Successmessage message={successmessage}/>}
        {errormessage && <Errormessage message={errormessage}/>}
    </div>
  )
}

export default LeaveRequest
