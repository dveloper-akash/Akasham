import React from 'react'
import HeroSection from '../components/HeroSection'
import HowitWorks from '../components/HowitWorks'
// import EarlyAccess from '../components/EarlyAccess'
import Footer from '../components/Footer'
import HeroLanding from '../components/HeroLanding'

const LandingPage = () => {
  return (
    <main className='bg-white font-poppins text-black'>
        <HeroSection/>
        <HowitWorks/>
        <HeroLanding/>
        {/* <EarlyAccess/> */}
        <Footer/>
    </main>
  )
}

export default LandingPage
        