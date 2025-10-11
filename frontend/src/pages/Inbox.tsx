
import BackNav from '../components/BackNav';
import Msgbox from '../components/Msgbox'
import { Star } from 'lucide-react'

const Inbox = () => {
  return (
    <div className='h-screen flex flex-col'>
        <BackNav name='Inbox' redirect='/editor/home'/>
        <div className='flex overflow-y-auto custom-scroll flex-col items-center gap-3 h-full w-full px-6 py-5'>
            <Msgbox/>
            <Msgbox/>
            <Msgbox/>
            <Msgbox/>
        </div>
        <div className='w-full flex items-center gap-1 bg-blue-200 font-poor-story text-xl justify-center font-medium  py-1'>
            <Star fill='yellow'/>
            <p className=''>Bookmark your editors and hire them later.</p>
        </div>
    </div>
  )
}

export default Inbox