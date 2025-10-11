import { useState, useRef } from 'react';
import user from '../assets/user.svg';
import { Link } from 'react-router-dom';
const PostCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className='bg-[#1b1b1b] rounded-2xl w-full max-w-150 flex flex-col  shadow-md text-white cursor-pointer transition-all duration-300 '>
      <div

        className=" p-4 pb-2 flex flex-col gap-2"
      >
        {/* Title and Description */}
        <div onClick={() => setIsOpen(!isOpen)} className="flex flex-col gap-1">
          <div className='flex items-center'>
            <div className='bg-yellow-300 rounded-full p-2  mr-2'>
              <img src={user} alt="profile" />
            </div>
            <h2 className="font-bold text-lg">Job Title <span className="text-sm ml-1 text-gray-400">2 days ago</span></h2>
          </div>

          <p className=" text-gray-300 font-poor-story mt-1 leading-tight text-xl line-clamp-2">
            I want to edit a video for my shop with smooth transitions and sfx.rgjgrjrgogrjogrj irgjeoirjrgoir rgi joerjggjrri jeroijgr ioegjorg
          </p>
          <p className="text-xs text-right text-green-400 mt-1">
            applied: <span className="font-semibold">20</span>
          </p>
        </div>
      </div>
        {/* Animated Reveal Section */}
        <div
          ref={contentRef}
          style={{
            maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
          }}
          className="overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div className="flex border-t border-[#3d3c3c98]  items-center  text-center text-lg text-gray-300">
            <Link to="/editor/hired" className='flex-1 border-r border-[#3d3c3c98] text-[#777] p-3'>Hired</Link>
            <Link to="/editor/inbox" className='flex-1 p-3'>Inbox</Link>
          </div>
        </div>
      
    </div>
  );
};

export default PostCard;