import React from 'react'

function Img({src}) {
  return (
        <img src={src} alt="poster bg" className='w-[100%] h-[100%] rounded-xl object-cover object-center' />
  )
}

export default Img