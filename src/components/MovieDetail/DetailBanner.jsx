import React, { useState } from 'react'
import { useMovieFetch } from '../../customHook/useMovieFetch'
import { useSelector } from 'react-redux'
import Img from './Img'
import { useParams } from 'react-router-dom'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import PosterFallback from '../../assets/no-poster.png'
import dayjs from 'dayjs'
import './PlayIconStyle.css'
import { PlayIcon } from './PlayIcon'
import VideoPopup from './VideoPopup'
import { LazyLoadImage } from 'react-lazy-load-image-component'
function DetailBanner({video,crew}) {
    const [show,setShow] = useState(false)
    const [videoId,setVideoId] = useState(null)
    const {url} = useSelector((state)=>state.home)
    const {mediaType,id}=useParams()
    const data = useMovieFetch(`/${mediaType}/${id}`)
    const director = crew?.filter((f)=>f.job === 'Director')
    const writer = crew?.filter((f)=>f.job ==="Screenplay" || f.job === "Story" || f.job === "Writer")  
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
  return ( 
    <>
    <div className='w-[100%] bg-black md:pt-[120px] pt-[100px] pb-12 text-black h-auto md:mb-0'>
        <div className='w-[100%] h-[100%] absolute top-16 z-0 left-0 opacity-20 overflow-hidden md:block hidden'>
            <Img src={url.backdrop + data?.backdrop_path}/>
        </div>
      <div className="w-[100%] h-[100%] absolute top-14 left-0 bg-gradient-to-b  from-black via-transparent to-black z-0"></div>
        {data?(
      <ContentWrapper>
        {/* left */}
           <div className='flex relative md:flex-row gap-10 mt-7 h-auto flex-col md:justify-center md:mx-10'>
              <div className='flex-shrink-0'>
                {data?.poster_path?(
                <div className="w-[100%] block rounded-xl z-2 md:w-80 shadowX">
                <Img src={url.backdrop+data?.poster_path}/>
                </div>):(
                <div className="w-[100%] block rounded-xl max-w-xs">
                <Img  src={PosterFallback}/>
                </div>)}
              </div>
              <div className='text-white'>
                   <div className='text-4xl 
                   font-semibold leading-10'>
                   {`${
                        data?.name || data?.title
                    } (${dayjs(
                        data?.release_date
                    ).format("YYYY")})`}
                   </div>
                   <div className='text-2xl leading-8 mb-4 italic opacity-50 mt-2'>{data?.tagline}</div>
                   <div className='flex flex-row'>
                  <div className='playbtn' onClick={()=>{setShow(true); setVideoId(video?.key);}}>
                    <PlayIcon/>
                    <span className='text'>Watch Trailer</span>
                  </div>
              </div>
              <div className='mb-6'>
                  <div className='mb-2 text-2xl mt-5 font-bold'>
                    Overview
                  </div>
                  <div className='leading-6 pr-[100px]font-bold'>
                      {data?.overview}
                  </div>
              </div>
              <div className='border-b border-gray-900 pr-4 pt-2 flex mb-5 small:items-center pb-3 text-xl flex-col small:flex-row items-start gap-2 small:gap-2'>
                  {data?.status && (
                  <div className='mr-3 flex flex-row flex-wrap'>
                           <span className='mr-3  leading-6 font-semibold'>
                            Status:{" "}
                            </span>
                            <span className='mr-3 leading-6 font-semibold opacity-50'>
                                {data?.status}
                            </span>
                           
                  </div>)}
                  {data?.release_date && (
                  <div className='mr-3 flex flex-row flex-wrap'>
                           <span className='mr-3  leading-6 font-semibold'>
                            Release Date:{" "}
                            </span>
                            <span className='mr-3 leading-6 font-semibold opacity-50'>
                                {dayjs(data.release_date).format('MMM D, YYYY')}
                            </span>
                           
                  </div>)}
                  {data?.runtime && (
                  <div className='mr-3 flex flex-row flex-wrap'>
                           <span className='mr-3  leading-6 font-semibold'>
                            Runtime:{" "}
                            </span>
                            <span className='mr-3 leading-6 font-semibold opacity-50'>
                                {toHoursAndMinutes( data?.runtime)}
                            </span>
                           
                  </div>)}
              </div>
              {director?.length > 0 && (
               <div className='border-b border-gray-900 pr-4 pt-2 flex mb-5 items-center pb-3 text-xl'>
                <span className='mr-3  leading-6 font-semibold'>
                    Director:{" "}
                </span>
                <span className='mr-3 leading-6 font-semibold opacity-50'>
                  {
                    director.map((d,i)=>(
                      <span key={i}>{d.name}
                      {director.length -
                                1 !==
                                i && ", "}
                      </span>
                    ))
                  }
                </span>
              </div>
               )}
        {writer?.length > 0  &&(
          <div className='border-b border-gray-900 pr-4 pt-2 flex mb-5 items-center pb-3 text-xl'>
             <span className='mr-3  leading-6 font-semibold'>
               Writer: {" "}
              </span>
              <span className='mr-3 leading-6 font-semibold opacity-50'>
                  {writer?.map((w,i)=>(
                     <span key={i}>
                     {w.name}
                     {writer.length -
                         1 !==
                         i && ", "}
                     </span>
                  ))}
              </span>
                </div>
               )} 
               {data?.created_by?.length > 0 && (
            <div className="border-b border-gray-900 pr-4 pt-2 flex mb-5  pb-3 text-xl">
                <span className="mr-3  leading-6 font-semibold">
                    Creator:{" "}
                </span>
                <span className="mr-3 leading-7 font-semibold opacity-50">
                    {data?.created_by?.map(
                        (d, i) => (
                            <span key={i}>
                                {d.name}
                                {data
                                    ?.created_by
                                    .length -
                                    1 !==
                                    i && ", "}
                            </span>
                        )
                    )}
                </span>
            </div>
        )}

               </div>
             </div>
       <VideoPopup 
       show={show}
       setShow= {setShow}
       VideoId = {videoId}
       setVideoId={setVideoId}/>      
      </ContentWrapper>
        ):(
          <div className='flex relative md:flex-row gap-10 mt-7 h-auto flex-col md:mx-10 md:justify-center px-10 bg-black'>
             {/* <ContentWrapper> */}
                 <div className='w-[100%] rounded-xl z-2 skeleton 
                 md:w-80 flex-shrink-0 md:justify-center aspect-square'></div>
                 <div className='w-full'>
                   <div className='w-full h-[25px] mb-[20px] rounded-[50px] skeleton'></div>
                   <div className='w-[75%] h-[25px] mb-[50px] rounded-[50px] skeleton'></div>
                   <div className='w-full h-[25px] mb-[20px] rounded-[50px] skeleton'></div>
                   <div className='w-full h-[25px] mb-[20px] rounded-[50px] skeleton'></div>
                   <div className='w-[50%] h-[25px] mb-[50px] rounded-[50px] skeleton'></div>
                   <div className='w-full h-[25px] mb-[20px] rounded-[50px] skeleton'></div>
                   <div className='w-full h-[25px] mb-[20px] rounded-[50px] skeleton'></div>

                 </div>
             {/* </ContentWrapper> */}
          </div>
        )}
           </div> 
    </>
  )
}

export default DetailBanner
