import React from 'react'

function VideoSectionSkeleton() {
  return (
      <>
        <div className='w-[200px] flex-shrink-0 md:w-[25%]'>
            <div className='w-full aspect-video rounded-xl mb-3 skeleton'></div>
            <div className='h-[20px] w-full rounded-[10px] mb-3'></div>
            <div className='h-[20px] w-[75%] rounded-[10px]'></div>
        </div>
      </>
    )
}

export default VideoSectionSkeleton