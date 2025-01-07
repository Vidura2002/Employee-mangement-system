import React from 'react'

const SummaryCard = ({icon,text,count,color}) => {
  return (

    <div className={`flex flex-col rounded-md px-5 py-5  gap-4 justify-center ${color} text-white shadow-md shadow-purple-500`}>
      <div className='flex flex-row items-center justify-between'>
        <div>
          <p className='text-base font-bold text-gray-400'>{text}</p>
        </div>
        <div className='text-1xl flex text-gray-400'>
          {icon}
        </div>
        
      </div>

      <p className='text-base font-bold text-gray-400'>{count}</p>
    </div>
    
  )
}

export default SummaryCard
