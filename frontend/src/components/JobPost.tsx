import React from 'react'
import PostCard from './PostCard'

const JobPost = () => {
  return (
    <div className='flex flex-col w-full px-6 py-3'>
        <h1 className='font-poor-story text-4xl font-semibold'>My Posts</h1>
        <div className='flex flex-col  gap-3 overflow-y-auto h-80 overflow-hidden custom-scroll items-center px-5 py-2  mt-2'>
          <PostCard/>
          <PostCard/>
          <PostCard/>
        </div>
    </div>
  )
}

export default JobPost