import React from 'react'
import BackNav from '../components/BackNav'
import OrderCard from '../components/OrderCard'

const OrderPage = () => {
  return (
    <div className='flex flex-col  h-screen bg-gray-100'>
        <BackNav name='Orders' redirect='/editor/home'/>
        <div className='flex flex-col items-center w-full gap-4 overflow-y-auto custom-scroll p-4 h-full'>
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
        </div>
    </div>
  )
}

export default OrderPage