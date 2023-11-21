import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import VideoPopup from '../MovieDetail/VideoPopup';
import { useMovieFetch } from '../../customHook/useMovieFetch'
import { useNavigate } from 'react-router-dom';
function VideoTitle({title,overview,movieIds}) {
  const navigate = useNavigate()
  let data = useMovieFetch(`/movie/${movieIds}/videos?language=en-US`)
    if(data){
      data=data?.results?.[0]
    }
    const [show,setShow] = useState(false)
    const [videoId,setVideoId] = useState(null)
  return (
    <div className="w-full aspect-video  px-8 absolute text-white bg-gradient-to-r from-black z-20 flex flex-col md:items-start justify-center items-center h-screen md:h-auto">
      <h1 className="font-bold  large:text-6xl text-4xl">{title}</h1>
      <p className= {`block py-3 middle:hidden  sm:w-[50%] text-center md:text-left px-2 text-xl w-full`}>{overview.slice(0,60)+'...'}</p>
      <p className= {`py-3 text-xl small:w-[50%] text-left large:text-left hidden middle:inline-block`}>{overview.slice(0,150)+'.....'}</p>
      <div className="my-4 md:m-0 flex">
      <Link to={""}>
        <button className=" bg-[rgba(51,51,51,0.5)] px-5 py-3 md:hover:scale-95   rounded-md text-center mr-4 text-white font-semibold text-2xl cursor-pointer md:block " onClick={()=>{setShow(true); setVideoId(data?.key);}}>
        <i className="fa fa-play text-red-600 mr-4 text-3xl"></i>Play
        </button>
        </Link>
        <button className="bg-[rgba(51,51,51,0.5)] px-5 py-3 md:hover:scale-95 rounded-md text-center mr-4 text-white font-semibold text-2xl cursor-pointer" onClick={()=>navigate
              (`/movie/${movieIds}`)}>
        <i className="fa fa-info text-3xl text-red-500 mr-4"></i> Info
        </button>
      </div>
      <VideoPopup 
       show={show}
       setShow= {setShow}
       VideoId = {videoId}
       setVideoId={setVideoId}/>  
    </div>
  );
}

export default VideoTitle