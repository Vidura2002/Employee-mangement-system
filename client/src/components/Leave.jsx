import { Button } from '@mui/material';
import React, { useEffect } from 'react'

const Leave = ({reason,type,decision,req_date,leave_date}) => {
    
    const color = decision ==="pending" ? "bg-yellow-100 text-gray-600" : decision==="approved" ? "bg-green-300 text-gray-600" : "bg-red-500";

  return (
    <div className='bg-gray-800 ml-3 mr-3 px-3 py-5 rounded-md shadow-md text-sm mt-4'>
      <div className='text-gray-300 font-medium'>{reason}</div>

        <div className='text-gray-400 flex flex-row justify-between mt-2'>
            <span className={`${color}  font-bold shadow-full px-3 pt-0.5 pb-0.5 rounded-full`}>{decision}</span>
            <span className='bg-gray-700 text-gray-300 font-bold shadow-full px-3 rounded-full'>Requested Date : {req_date}</span>
        </div>

        <div className='text-gray-400 flex flex-row justify-between mt-2'>
            <span className='bg-gray-700 text-gray-300 font-bold shadow-full px-3 rounded-full'>{type}</span>
            <span className='bg-gray-700 text-gray-300 font-bold shadow-full px-3 rounded-full'>Leave Date : {leave_date}</span>
        </div>

        <div className='mt-2 flex justify-end '>
            {decision==="pending" && 
            <Button variant='outlined' color='error' size='small'
            >Cancel</Button>}
        </div>
    </div>
  )
}

export default Leave
