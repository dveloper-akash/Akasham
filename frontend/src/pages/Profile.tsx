
import user from '../assets/user.svg';
import { Star, Heart } from 'lucide-react';
import BackNav from '../components/BackNav';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';

const ProfilePage = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-white text-black">
      <BackNav name='Profile' redirect='/editor/inbox' />
      <div className="h-[calc(100vh-56px)] overflow-y-auto custom-scroll px-8 max-w-170 mx-auto py-6 ">
        {/* Profile Header */}
        <div className="flex sm: gap-6 items-center mb-4">
          <div className='w-1/3 sm:w-1/2 flex justify-center items-center'>
            <div className="bg-orange-500 rounded-full sm:w-43 sm:h-43 w-35 h-35 flex items-center justify-center overflow-hidden">
              <img src={user} alt="profile" className="w-20 h-20" />
            </div>
          </div>


          <div className="flex sm:w-1/2 w-2/3 sm:gap-1 flex-col">
            <h1 className="text-4xl line-clamp-1 sm:text-5xl font-bold leading-none">Editor</h1>
            <p className="text-gray-500  line-clamp-1 text-md sm:text-lg -mt-1 tracking-wide font-medium">
              editor | 2yr Exp | ex-Google
            </p>
            <span className='font-semibold text-xl mt-1 text-blue-600'>1k Followers</span>
            <div className="flex items-center sm:gap-1 text-xl sm:text-2xl ">
              <Star className="w-6 fill-black stroke-black" />
              <span className="ml-1 font-semibold">4.3</span>
              <span className="text-gray-500 ml-1 text-lg">(10 reviews)</span>
            </div>
            <span className="text-green-600 text-lg sm:text-xl font-semibold ">20 orders</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex  gap-4 mb-6">
          <button className="bg-blue-600 hover:bg-blue-700 flex-1 text-white font-semibold py-2 rounded-xl text-lg">
            Follow
          </button>
          <button className="bg-black hover:bg-[#252525] flex-1 text-white font-semibold py-2 rounded-xl text-lg">
            Message
          </button>
        </div>

        {/* My Works */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">My Works</h2>
          <Swiper modules={[Pagination]} spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }} className="rounded-xl overflow-hidden">
            <SwiperSlide >
              <div className="bg-black w-full h-50 flex items-center justify-center text-white text-xl">Slide 1</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-black w-full h-50 flex items-center justify-center text-white text-xl">Slide 2</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-black w-full h-50 flex items-center justify-center text-white text-xl">Slide 3</div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* About Gig */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">About Gig</h2>
          <p className="text-xl  font-poor-story  text-black leading-snug">
            Hi! My name is editor and I have a team of professional YouTube video editors. I have more than 10 years of experience in editing videos with Adobe Premiere Pro and Adobe After Effects.
          </p>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
          <div className="bg-black text-white p-4 rounded-2xl relative">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Name</p>
                <p className="flex items-center gap-1 text-sm">
                  <Star className="w-4 fill-white stroke-white" /> 4.9
                </p>
              </div>
              <Heart className="w-5 text-white opacity-70" />
            </div>
            <p className="mt-2 text-sm leading-snug">
              I am ready to edit your video with engaging transitions and sfx.
            </p>
            <span className="absolute bottom-2 right-4 text-xs text-gray-400">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;