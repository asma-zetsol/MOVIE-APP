import React from 'react'
import { useSelector } from 'react-redux'
import PosterFallback from "../../assets/no-poster.png"
import MovieCard from '../SecondaryContainer/MovieCard'
import { useNavigate } from 'react-router-dom'
import Skeleton from '../SkeletonItems/Skeleton'
function MovieList({movies,loading,endPoint}) {
  const {url} = useSelector((state)=>state.home)
  const navigate = useNavigate()
  return (
    <div className="">
      <div className="flex overflow-x-scroll scrollbar-none scrollbar-hide">
    {movies&&( 
        <div className="flex gap-5">
          {movies?.map((movie) => {
            const posterPath = movie.poster_path?url?.poster + movie.poster_path:PosterFallback
            return(
              <div onClick={()=>navigate
              (`/${movie.media_type||endPoint}/${movie.id}`)}  key={movie.id}>
            <MovieCard posterPath={posterPath} title={movie.title||movie.name} dates={movie.release_date} genre={movie.genre_ids}/></div>)})}
        </div>
     
   )}
   </div>
  </div>
  );
}

export default MovieList