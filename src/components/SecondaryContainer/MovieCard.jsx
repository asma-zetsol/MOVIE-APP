import React from 'react'
import dayjs from 'dayjs'
import Genre from '../Genres/Genre'
import Img from '../LazyLoadImage/img'
function MovieCard({posterPath,title,dates,genre}) {
  return (
    <>
    <div className='h-auto cursor-pointer mb-4  flex flex-col gap-2 flex-shrink-0 lg:w-[230px] sm:w-[250px] w-[240px]'>
    <div className=" w-full rounded-lg relative flex items-end justify-between h-[350px] aspect-square shadow hover:scale-90 transition-all">
        <Img src={posterPath} className="posterImg"/>
        <Genre data={genre?.slice(0,2)}/>
    </div>
    <div className='flex flex-col md:w-60'>
       <span className='h-[20px] mb-1 mt-1 text-white md:block hidden'>
          {title?.length>18?title.substring(0,18)+"...":title}
       </span>
       <span className='h-4 text-white opacity-50 md:block hidden'>{dayjs(dates).format("MMM D, YYYY")}</span>
    </div>
    </div>
    </>
  )
}

export default MovieCard