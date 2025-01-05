import React from 'react'

const LeaveRequest = () => {
  return (
    <div className='px-5 shasow-md bg-gray-700 mx-2 my-2 rounded-md h-full'>
        <div className='flex flex-row items-center justify-center mt-5 py-1'>
            <h3 className='text-2xl text-white font-bold'>Leave Request</h3>
        </div>

        <form>
        <div className='flex flex-col items-center justify-center mt-5 '>
                <div className='flex flex-col gap-2 mt-4 text-white'>
                    <label htmlFor='reason'>Enter your leave reason</label>
                    <textarea className='border border-white-300 bg-gray-700 rounded-md px-2 py-1 w-96 h-40' type='text' placeholder='mention your reason'></textarea>
                </div>

                <div className='flex flex-col gap-2 mt-5 text-white'>
                    <label htmlFor='date'>Leave required date</label>
                    <input className='border border-white-300 bg-gray-700 rounded-md px-2 py-1 w-96 ' type='date' ></input>
                </div>

                <div className='flex flex-col gap-2 mt-5 text-white'>
                    <label htmlFor='to'>To</label>
                    <select className='border border-white-300 bg-gray-700 rounded-md px-2 py-1 w-96 ' type='date' >
                        <option value="">Select a receiver</option>
                    </select>
                </div>

                <button type='submit' className='text-white font-bold bg-purple-700 rounded-md w-96 py-2 mt-5 hover:bg-purple-800'>Request a leave</button>
            </div>
        </form>
    
      
    </div>
  )
}

export default LeaveRequest
