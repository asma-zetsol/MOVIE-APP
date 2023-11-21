import React from 'react'
import { useSelector } from 'react-redux'
import { getAllMovies } from '../../features/movies/movieSlice'
import VideoTitle from '../VideoBackground/VideoTitle'
import VideoBackground from '../VideoBackground/VideoBackground'
function MainContainer() {
  const movies = useSelector(getAllMovies)
   if(!movies)return
   const mainMovieBackground = movies[3]
   const posterPath = movies[3].poster_path
   const {original_title, overview, id} = mainMovieBackground
  return (
    <>
    <div className='pt-0  bg-black'>
        <VideoTitle title={original_title} overview={overview} movieIds={id}/>
        <VideoBackground movieId={id} posterPath={posterPath}/>
    </div>
    </>
  )
}

export default MainContainer