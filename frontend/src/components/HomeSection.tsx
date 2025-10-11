import { Clapperboard, Scissors, MessageCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
const HeroSection = () => {
    return (
        <section className='flex flex-col w-full px-6 py-5 '>
            <h1 className='font-poor-story text-5xl '>Hii User</h1>
            <div className="relative max-w-200 w-[95%]  mx-auto mt-4 items-center  flex flex-col rounded-4xl overflow-hidden bg-gradient-to-b from-[#818181] to-zinc-800 px-5 py-7 text-[#a9a9a9] shadow-lg">
                {/* Floating Icons */}
                <Clapperboard className="absolute left-4 -rotate-12 top-3 w-12 h-12 opacity-20" />
                <Scissors className="absolute right-6 top-5 w-14 h-14 opacity-20 -rotate-10" />
                <MessageCircle className="absolute left-6 bottom-4 w-13 h-13 opacity-10" />
                <MessageSquare className="absolute right-18 bottom-2 rotate-16 w-12 h-12 opacity-11" />
                <div className='text-center'>
                    <h1 className='font-semibold text-[#fff] text-2xl'>Your Story deserves <br /> the Perfect Editor.</h1>
                </div>
                <div className='mt-4'>
                    <Link to="/editor/create-post" className='bg-white relative transition duration-200 hover:text-white border border-transparent hover:border-white hover:bg-transparent text-lg rounded-lg font-bold text-black px-3 py-1  '>Create Post</Link>
                    
                </div>
                

            </div>
        </section>

    );
};

export default HeroSection;
