import user from '../assets/user.svg';
import { Star } from "lucide-react";
import { useState } from "react";



const Msgbox = () => {
    const [bookmarked, setBookmarked] = useState(false);
    return (
        <div  className='bg-[#1b1b1b] rounded-2xl w-full max-w-150 flex flex-col  shadow-lg text-white cursor-pointer transition-all duration-300 '>
            <div

                className=" p-4  flex flex-col "
            >
                {/* Title and Description */}
                <div className="flex flex-col gap-1">
                    <div className='flex items-center'>
                        <div className='bg-green-300 rounded-full p-3  mr-2'>
                            <img src={user} alt="profile" className='w-7 h-auto' />
                        </div>
                        <div className='flex w-full flex-col'>
                            <h2 className="font-bold text-lg">Job Title <span className="text-sm ml-1 text-green-500">20 orders</span></h2>
                            <p className='flex gap-1 leading-none  text-sm font-medium text-gray-300'><span>Editor</span>|<span>2yr Exp</span>|<span>Ex-Google</span></p>
                        </div>
                        <button
                            onClick={() => setBookmarked((prev) => !prev)}
                            aria-label="Toggle Bookmark"
                            className="cursor-pointer transition-colors mr-1 -mt-1 duration-200"
                        >
                            <Star
                                className={`w-6 h-6 stroke-[2.5] ${bookmarked ? "fill-yellow-400 text-yellow-400" : "fill-none text-white"
                                    }`}
                            />
                        </button>
                    </div>

                    <p className=" px-1 font-poor-story mt-1 leading-tight text-xl line-clamp-2">
                        I want to edit a video for my shop with smooth transitions and sfx.rgjgrjrgogrjogrj irgjeoirjrgoir rgi joerjggjrri jeroijgr ioegjorg
                    </p>
                    <p className="text-xs text-right text-gray-400 mt-2">
                        2 Days ago
                    </p>
                </div>
            </div>
        </div>

    )
}
export default Msgbox