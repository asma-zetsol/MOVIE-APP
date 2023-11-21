import React from 'react'
import DetailBanner from './DetailBanner'
import { useParams } from 'react-router-dom'
import { useMovieFetch } from '../../customHook/useMovieFetch'
import Cast from './Cast'
import VideoSection from './VideoSection'
import SimilarMovies from './SimilarMovies'
import Recommendation from './Recommendation'

function MovieDetail() {
  const {mediaType,id}=useParams()
  const data = useMovieFetch(`/${mediaType}/${id}/videos`)
  const credits = useMovieFetch(`/${mediaType}/${id}/credits`)
  return (
    <>
    <div className=''>
      <DetailBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast cast={credits?.cast}/>
      <VideoSection data={data}/>
      <SimilarMovies mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id}/>
      </div>
    </>
  )
}

export default MovieDetail