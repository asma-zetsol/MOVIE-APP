import React from 'react'

function ContentWrapper({children}) {
  return (
    <div className='w-[100%] mx-auto px-10 py-0'>{children}</div>
  )
}

export default ContentWrapper