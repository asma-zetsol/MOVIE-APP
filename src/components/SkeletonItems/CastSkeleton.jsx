import React from 'react'

function CastSkeleton() {
  return (
    <>
       <div>
      <div className='w-[175px] h-[175px] rounded-[50%] mb-[15px] skeleton md:w-[175px] md:h-[175px] md:mb-6'></div>
      <div className='w-full h-[20px] rounded-[10px] mb-[10px] skeleton'></div>
      <div className='w-[75%] h-[20px] rounded-[10px] mx-auto skeleton'></div>
      </div>
    </>
  )
}

export default CastSkeleton