import React from 'react'
import hero from '../assets/hero.svg'
import { Link } from 'react-router-dom'
const HeroSection = () => {
  return (
    <section className='relative h-screen   flex flex-col  items-center px-6 py-5   '>
      
        <header className='relative flex items-center justify-between lg:mb-3 w-full'>
                <h1 className='font-bold text-4xl tracking-tighter'>akasham</h1>
                <Link to='/signup' className='font-bold text-xl border-2 border-black px-5 py-1 rounded-full hover:bg-black hover:text-white transition duration-200 ' type="button">Signup</Link>
        </header>
        <div className='relative  w-full h-full '>
            <img src={hero} alt="" className='absolute inset-0 w-full h-full '/>
        </div>
        
        <h1 className='pt-3 text-center font-poor-story sm:text-3xl text-xl tracking-wide opacity-60'>A platform where Creators meet Editors</h1>
          
          
        
    </section>
  )
}

export default HeroSection