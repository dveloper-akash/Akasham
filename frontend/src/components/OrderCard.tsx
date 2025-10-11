import React from 'react'
import user from '../assets/user.svg';
import { Link } from 'react-router-dom';
const OrderCard = () => {
  return (
    <Link to='/editor/orderdetails' className='w-full shadow-lg  max-w-150 hover:scale-101 transition-all duration-300 cursor-pointer flex border-2 border-[#00000061] rounded-2xl flex-col gap-1 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-end gap-2'>
          <h1 className='text-3xl font-semibold'>Title</h1>
          <h3 className='font-semibold text-lg text-gray-600'>2 Days</h3>
        </div>
        <div>
          <h1 className='bg-green-200 py-1 px-3 font-medium text-green-900 rounded-full '>active</h1>
        </div>
      </div>
      <div className='flex flex-col  '>

        <div className='flex flex-col  ml-1 sm:ml-0'>
          <h2 className='font-medium '>Hire Date:</h2>
          <h2 className='font-medium'>Order ID:</h2>
        </div>
        <div className='flex justify-between items-center mt-2'>
          <div className='flex items-center  gap-2'>
            <div className='bg-orange-500 p-2 rounded-full'><img src={user} alt="profile" /></div>
            <h1 className='font-semibold text-2xl'>Editor</h1>
          </div>
          <h1 className='text-4xl text-blue-600 font-semibold'>₹999</h1>
        </div>

      </div>
    </Link>
  )
}

export default OrderCard
