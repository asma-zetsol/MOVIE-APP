import React,{useEffect} from 'react'
import { useMovieFetch } from '../../customHook/useMovieFetch'
import { addMovie } from '../../features/movies/movieSlice'
import { useDispatch } from 'react-redux';
import MainContainer from '../MainContainer/MainContainer';
import SecondaryContainer from '../SecondaryContainer/SecondaryContainer';
function Browse() {
  const dispatch =  useDispatch()
  const data =  useMovieFetch("/movie/now_playing?page=1")
  useEffect(() => {
    if (data) {
      dispatch(addMovie(data?.results));
    }
  }, [data]);
  return (
    <>
      <MainContainer/>
      <SecondaryContainer/>
    </>
    )
}

export default Browse