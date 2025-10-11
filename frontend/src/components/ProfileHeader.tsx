import React from 'react';
import user from '../assets/user.svg';
import { Star } from 'lucide-react';

const ProfileHeader = () => {
  return (
    <div className="flex flex-col items-center w-full px-4 py-6">
      {/* Top row: Profile Image + Info */}
      <div className="flex gap-4 sm:gap-6 md:gap-10 justify-center w-full items-start">
        <div className="bg-orange-500 rounded-full w-24 sm:w-28 md:w-32 aspect-square flex items-center justify-center overflow-hidden">
          <img src={user} alt="profile" className="w-16 sm:w-20 md:w-24 h-auto" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Editor</h1>
          <p className="text-gray-500 text-sm sm:text-base md:text-md -mt-1 font-medium">
            editor | 2yr Exp | ex-Google
          </p>

          <span className="text-base sm:text-lg font-semibold text-blue-600 mt-1">
            1.2k followers
          </span>

          <div className="flex items-center gap-1 text-sm sm:text-base mt-1">
            <Star className="w-5 sm:w-6 fill-black stroke-black" />
            <span className="font-semibold">4.3</span>
            <span className="text-gray-500">(10 reviews)</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 sm:gap-8 w-full mt-5 px-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl text-sm sm:text-lg flex-1 max-w-[140px]">
          Follow
        </button>
        <button className="bg-black hover:bg-gray-800 text-white font-semibold px-5 py-2 rounded-xl text-sm sm:text-lg flex-1 max-w-[140px]">
          Message
        </button>
      </div>

      {/* Hire Me */}
      <div className="mt-3">
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full text-sm sm:text-base">
          Hire Me
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
