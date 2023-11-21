import React,{useState} from 'react'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import { PlayIcon } from './PlayIcon';
import './VideoSectionStyle.css'
import VideoPopup from './VideoPopup';
import Img from './Img';
 import VideoSkeleton from '../SkeletonItems/VideoSkeleton';
function VideoSection({data}) {
  const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    if(data?.results.length===0){
      return}
  return (
    <>
    <div className='relative pb-12 bg-custom-gray pt-7'>
        <ContentWrapper>
            <div className='text-3xl text-white mb-6 font-bold'>
             Officails Videos </div>
                {data?(
                <div className='flex gap-3 overflow-auto mr-[-20px] ml-[-20px] pb-6 pl-6 md:gap-5 md:m-0 md:p-0 scrollbar-hide scrollbar-none'>
                  
                  {data?.results?.map((video)=>{
                    return(
                    <div key={video.id} className='w-[200px] shrink-0 md:w-[25%] cursor-pointer' onClick={()=>{setVideoId(video.key);setShow(true)}}>
                      <div className='videoThumbnail'>
                        <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}/>
                        <PlayIcon/>
                      </div>
                      <div className='text-white text-sm leading-5 md:text-lg md:leading-6'>{video.name}</div>
                    </div>
                  )})}
                </div>
                ):(<div className='flex gap-[10px] overflow-x-auto -mr-5 -ml-5 px-5 md:gap-5 md:m-0 md:p-0 scrollbar-hide scrollbar-none'>
                    <VideoSkeleton/>
                    <VideoSkeleton/>
                    <VideoSkeleton/>
                    <VideoSkeleton/>
                    <VideoSkeleton/>
                </div>)}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                VideoId={videoId}
                setVideoId={setVideoId}
            />
    </div>
    </>
  )
}

export default VideoSection