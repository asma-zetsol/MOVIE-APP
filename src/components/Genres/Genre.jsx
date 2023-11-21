import React from 'react'
import { useSelector } from 'react-redux'

function Genre({data}) {
    const {genres} = useSelector((state)=>state.home)
  return (
       <>
          <div className='gap-1 absolute right-2 bottom-2 sm:flex hidden'>
             {data?.map((g)=>{
                if(!genres[g]?.name) return
                return(
                    <div key={g} className='bg-red-600 px-1 py-[2px] text-[12px] rounded-lg text-white  whitespace-nowrap elipsis'>{genres[g]?.name}</div>
                )
             })}
          </div>
       </>
    )
}

export default Genre