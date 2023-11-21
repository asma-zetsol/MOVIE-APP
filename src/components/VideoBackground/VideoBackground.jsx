import React from 'react'
import { useMovieFetch } from '../../customHook/useMovieFetch'
import { useSelector } from 'react-redux'
function VideoBackground({movieId,posterPath}) {
    let filterData = ""
    const {url} = useSelector((state)=>state.home)
    const poster = url?.poster + posterPath
        let data = useMovieFetch(`/movie/${movieId}/videos?language=en-US`)
        if(data){
           data = data?.results
           filterData = data.filter((video)=>video.type==='Trailer')
           filterData=filterData[0].key
        }
  return (
    <>
      <div className='w-full aspect-video hidden md:block bg-custom-lightgray z-0'>
         {!filterData?(
          <div className='w-full aspect-video bg-black skeleton'>
          </div>
         ):(
        <iframe
          width='100%'
          height='100%'
          src={"https://www.youtube.com/embed/" + filterData+"?playlist="+filterData+"&loop=1&autoplay=1&mute=1"}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen></iframe>
      )}
      </div>

      {/* mobile background */}
      <div className=" md:hidden h-screen">
      <img className ="w-[100%] mx-auto rounded-xl h-full"
        src={poster} alt="movie poster make it dynamic" />
      </div>
    </>
    )
}

export default VideoBackground