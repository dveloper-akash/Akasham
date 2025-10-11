import { Link } from 'react-router-dom';
import back from '../assets/back.svg'
type BackNavProps = {
  name: string;
  redirect:string }
const BackNav = ({ name, redirect }:BackNavProps) => {
  return (
    <nav className='flex items-center w-full border-b border-[#4949492d] shadow-md  px-4 py-4'>
        <Link to={redirect}><img className='w-9 ' src={back} alt="back-btn" /></Link>
        <div><h1 className='leading-none tracking-tight font-semibold text-2xl sm:text-3xl'>{name}</h1></div>
    </nav>
  )
}

export default BackNav