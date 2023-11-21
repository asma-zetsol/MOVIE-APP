import React from 'react'
import ReactPlayer from 'react-player';
export default function VideoPopup({show,setShow,VideoId,setVideoId}) {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    // console.log("video id inlije : ",VideoId)
  return (
    <>
    <div className={`flex items-center justify-center w-full h-full fixed top-0 left-0 z-50 ${show? 'block' : 'hidden'}`}>
        <div className='absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.25)] backdrop-blur-[3.5px] webkit-backdrop-blur-[3.5px]  transition-opacity duration-400' onClick={hidePopup}></div>
        <div className='relative w-[800px] bg-white m-auto duration-250 border aspect-video'>
            <span className='absolute top-[-20px] right-[-20px] text-white cursor-pointer mb-1 text-lg px-4 py-2 border-2 border-white z-20 rounded-full font-bold hover:border-gray-500 hover:text-gray-500' onClick={hidePopup}>X</span>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${VideoId}`}
                controls
                width="100%"
                height="100%"
                playing={true}
                />                
        </div>
    </div>
    
    </>
  )
}
