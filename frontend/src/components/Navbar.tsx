import React from 'react'
import menu from '../assets/menu.svg';
import { useState } from 'react';
import Sidebar from './Sidebar';
const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
  <>
    <nav className='flex items-center border-b border-[#4949492d] shadow-md justify-between px-6 py-5'>
        <h1 className='font-bold text-4xl tracking-tighter'>akasham</h1>
        <div className='flex items-center  gap-5'>
            <button  className='font-bold text-xl border-2 border-black sm:px-5 px-4 py-1 rounded-full hover:bg-black hover:text-white transition duration-200 ' type="button">Switch Role</button>
            <button onClick={() => setSidebarOpen(true)} aria-label="Open menu"><img src={menu} className='w-8' alt="menu" /></button>
        </div>
    </nav>
    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>  
        )
}

export default Navbar