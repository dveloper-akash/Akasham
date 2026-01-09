
const Footer = () => {
  return (
    <footer className='flex items-center justify-between  h-60 p-9 text-white bg-[#1a1a1a]'>
        <div className='h-full '>
            <h1 className='text-4xl  font-bold tracking-tight'>akasham</h1>
            <h3 className='text-sm font-light leading-none'>©copyright 2025. All rights reserved.</h3>
            
        </div>
        <ul className='flex h-full pt-1 flex-col gap-2 text-sm tracking-wide'>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Refund & Cancellation</li>
            <li>legal Notices</li>
        </ul>
    </footer>
  )
}

export default Footer