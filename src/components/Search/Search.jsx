import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import noResults from "../../assets/no-results-rem.png"
import { useParams } from 'react-router-dom'
import { fetchDataFromapi } from '../../utility/api'
import Spinner from '../Spinner/Spinner'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import { useNavigate } from 'react-router-dom'
import Img from '../MovieDetail/Img'
import MovieCard from '../SecondaryContainer/MovieCard'
import { useSelector } from 'react-redux'

import PosterFallback from "../../assets/no-poster.png"
function Search() {
  const {url} = useSelector((state)=>state.home)
  const [data,setData] = useState(null)
  const [pageNum,setPageNum] = useState(1)
  const [loading,setLoading] = useState(false)
  let {query} = useParams()
  const navigate = useNavigate()
  const fetchInitialData = async()=>{
    setLoading(true)
   const res = await fetchDataFromapi(`/search/multi?query=${query}&page=${pageNum}`)
    setData(res)
    setLoading(false)
    setPageNum((prev)=>prev+1)
  }
  const fetchNextPageData = async()=>{
      const res = await fetchDataFromapi(`/search/multi?query=${query}&page=${pageNum}`)
      if(data?.results){
        setData({
          ...data,results:[...data?.results,...res.results]
        })
        console.log("result for search: ",data) 
      }else{
        setData(res)
      }
    setPageNum((prev)=>prev+1)

  }
  useEffect(()=>{
    fetchInitialData()
    // return ()=>{
    //   query=""
    // }
  },[query])
  return (
    <>
    <div className='min-h-[700px] pt-28 w-full border border-red-800 bg-custom-gray scrollbar-hide overflow-hidden'>
      {loading&&<Spinner initial={true}/>}
      {!loading&&(
        <ContentWrapper>
              {data?.results.length > 0 ? (
            <>
              <div className='text-2xl leading-8 mb-[25px] text-white font-bold'>{
                `Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`
              }</div>
              <InfiniteScroll className='flex flex-wrap gap-3 mb-[50px] md:gap-2 flex-row scrollbar-hide overflowHide items-center justify-center' dataLength={data?.results?.length||[]}
              next={fetchNextPageData}
              hasMore={pageNum<=data?.total_pages}
                      loader={<Spinner initial={true}/>}>
                  {data?.results?.map((item,index)=>{
                    if(item.media_type === "person")return;
                    const posterPath = item?.poster_path?url?.poster + item?.poster_path:PosterFallback
                    return(
                      <div onClick={()=>navigate
                        (`/${item?.media_type||endPoint}/${item?.id}`)}>
                      <MovieCard key={item?.id} posterPath={posterPath} title={item?.title||item?.name} dates={item?.release_date}/></div>
                    )
                  })}
              </InfiniteScroll>
            </>
            ):(
              <div className='md:w-[500px] h-[500px] mx-auto flex justify-center items-center flex-shrink w-[100%]'>
              <img src={noResults} alt="No results" className='w-full h-full'/>
              </div>
            )}
        </ContentWrapper>
      )}
    </div>
    </>
  )
}

export default Search