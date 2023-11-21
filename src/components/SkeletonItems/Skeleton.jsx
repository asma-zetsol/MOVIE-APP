import React from 'react'

function Skeleton() {
  return (
      <div className='lg:w-[230px] sm:w-[250px] flex-shrink-0 mb-8 w-[240px]'>
        <div className='w-full rounded-lg mb-8 aspect-square skeleton'>
        </div>
        <div className='flex flex-col md:w-60'>
             <div className='h-[20px] mb-1 mt-1 md:block hidden skeleton'></div>
             <div className='h-4 md:block hidden skeleton'></div>
        </div>

      </div>
    )
  }

export default Skeleton