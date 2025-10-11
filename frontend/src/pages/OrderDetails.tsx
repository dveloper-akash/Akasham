import React from 'react';
import { Star } from 'lucide-react';
import BackNav from '../components/BackNav';
import user from '../assets/user.svg';
import LineHeader from '../components/LineHeader';
import { Link } from 'react-router-dom';

const OrderDetails = () => {
  return (
    <div className="w-full h-screen flex items-center flex-col bg-white text-black">
      <BackNav name='Order Details' redirect='/editor/orders' />

      {/* Page Container */}
      <div className="w-full h-full overflow-y-auto custom-scroll max-w-200 p-4 pb-6 px-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between -mb-1 items-center">
          <h1 className="text-4xl font-bold">Title</h1>
          <span className="text-sm text-blue-600">Any Help?</span>
        </div>

        <LineHeader Heading="Summary" />

        {/* Summary Section */}
        <div className="">
          
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="bg-orange-500 rounded-full w-25 h-25 flex items-center justify-center ">
                <img src={user} alt="editor" className="w-12 h-12" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold">Editor</h3>
                <p className="text-sm -mt-1 text-gray-500">editor | 2yr Exp | ex-Google</p>
                <div className="flex items-center gap-1 text-lg ">
                  <Star className="w-7 fill-black stroke-black" />
                  <span className="font-semibold">4.3</span>
                  <span className="text-gray-500">(10 reviews)</span>
                </div>
                <Link to='editor/profile' className="text-blue-500 text-md ml-1  text-left font-medium ">View Profile</Link>
              </div>
            </div>
            <div className="text-4xl font-bold text-green-600">₹999</div>
          </div>

          <div className="mt-4 text-md space-y-1">
            <p>Order ID: <span className="text-gray-500">#4352abcd123AQ1</span></p>
            <p>Hired Date: <span className="text-gray-500">31-10-2004</span></p>
            <p>Due Date: <span className="text-red-500 font-medium">04-11-2004</span></p>
          </div>
        </div>
        <LineHeader Heading="Requirement Details" />
        {/* Requirement Details */}
        <div className=" ">
          
          <div className="text-md space-y-3">
            <div>
              <p className="font-semibold text-lg">Description</p>
              <p className="text-gray-700">I want a 1 minute video reel to post on Instagram.It should be well edit with nice transitions and feel good sfx.</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Video Type</p>
              <p className="text-gray-700">Short—Form</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Video Duration</p>
              <p className="text-gray-700">1–5 mins</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Music Preferences</p>
              <p className="text-gray-700">I want a 1 minute video reel to post on Instagram.It should be well edit with nice transitions and feel good sfx.</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Style / Color Tone</p>
              <p className="text-gray-700">I want a 1 minute video reel to post on Instagram.It should be well edit with nice transitions and feel good sfx.</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Raw File Links</p>
              <p className="text-blue-600">www.drive.google.com/wutgefuycgeuy3u7</p>
              <p className="text-blue-600">www.drive.google.com/etygyctgw3t82t6g</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Add. Notes</p>
              <p className="text-gray-700">I want a 1 minute video reel to post on Instagram.It should be well edit with nice transitions and feel good sfx.</p>
            </div>
          </div>
        </div>

        <LineHeader Heading="Order Chat" />

        <div className="">
          
          <div className="bg-[#1a1a1a] h-70 rounded-xl p-3 text-white space-y-2">
            
          </div>
        </div>

        <LineHeader Heading="Delivery" />

        {/* Order Status */}
        <div className="">
          
          <div className="w-full h-45 border-2 border-gray-300 rounded-xl flex items-center justify-center text-gray-600">
            <div className="flex flex-col items-center">
              <div className="bg-violet-300 rounded-full w-10 h-10" />
              <p className="mt-2 text-sm">Waiting for Editor to Deliver</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;