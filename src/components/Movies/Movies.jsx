import React, { useEffect, useState } from 'react'
import noResults from "../../assets/no-results.png"
import { useParams } from 'react-router-dom'
import { fetchDataFromapi } from '../../utility/api'
import Spinner from '../Spinner/Spinner'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PosterFallback from "../../assets/no-poster.png"
import Select from 'react-select'
import { useMovieFetch } from '../../customHook/useMovieFetch'
import MovieCard from '../SecondaryContainer/MovieCard'
let filters = {}
const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];
function Movies() {
  const {url} = useSelector((state)=>state.home)
  const [data,setData] = useState(null)
  const [pageNum,setPageNum] = useState(1)
  const [loading,setLoading] = useState(true)
  const {mediaType} = useParams()
  const navigate = useNavigate()
  const [genre,setGenre] = useState(null)
  const [sortby,setSortBy] = useState(null)
  const [prevPageData,setPrevPageData]=useState(null)
  const [forwardPageData,setForwardPageData]=useState(null)
  const [totalNumPages,setTotalNumPages]=useState(null)
  const genresData = useMovieFetch(`/genre/${mediaType}/list`)
  const fetchInitialData = async()=>{
    setLoading(true)
   const res = await fetchDataFromapi(`/discover/${mediaType}?page=${pageNum}`,filters)
    setData(res)
    if(pageNum===1){
      setPrevPageData(1)
      setForwardPageData(res?.results?.length)
      setTotalNumPages(res?.total_results)
    }

    setLoading(false)
  }
  const onChangePageForward=()=>{
    setPageNum((prev)=>prev+1)   
    setPrevPageData(forwardPageData+1)
    setForwardPageData((pageNum+1)*data?.results?.length)
  }
  const onChangePagePrev=()=>{
    setPageNum((prev)=>prev-1)
    if(pageNum>1){
      setPrevPageData(prevPageData-data?.results?.length)
      setForwardPageData((pageNum-1)*data?.results?.length)
    }
  }
  useEffect(()=>{
    filters={}
    fetchInitialData()
  },[mediaType,pageNum])
  const onChange = (selectedItems,action)=>{
    if(action.name === "sortby"){
        setSortBy(selectedItems)
        if(action.action!= "clear"){
           filters.sort_by = selectedItems.value
        }
        else{
           delete filters.sort_by
        }
    }
    if(action.name === "genres"){
        setGenre(selectedItems)
        if(action.action!== "clear"){
          let genreId = selectedItems?.map((g)=>g.id)
          genreId = JSON.stringify(genreId).slice(1,-1)
             filters.with_genres = genreId
        }
        else{
          delete filters.with_genres
        }
    }
    setPageNum(1)
    fetchInitialData()
}
          
  return (
    <>
    <div className='min-h-[700px] pt-28 w-full moviesGradient scrollbar-none scrollbar-hide overflow-y-hidden py-6'>
        <ContentWrapper>
             <div className='flex justify-between mb-6 flex-col md:flex-row mt-7'>
                <div className='md:text-3xl  text-white mb-8 md:mb-0 font-bold md:text-left text-center text-4xl'>
                    {mediaType === "tv"?"Explore Tv Shows":"Explore Movies"}
                    </div>
                    <div className='filters'>
                        <Select isMulti 
                        name='genres' 
                        value={genre}
                        closeMenuOnSelect={false}
                        options={genresData?.genres}
                        getOptionLabel={(option)=>option.name}
                        getOptionValue={(option)=>option.id}
                        onChange={onChange}
                        placeholder="Select genres"
                        className='react-select-container genresDD'
                        classNamePrefix="react-select"/>
                         <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {loading&&<Spinner initial={true}/>}
                {!loading?(
                  <>
                    <div className='flex justify-center items-center mt-12 flex-wrap flex-row gap-5'>
                     {data?.results?.length>0?(
                      data?.results?.map((item,index)=>{
                        if(item.media_type === "person")return;
                        const posterPath = item?.poster_path?url?.poster + item?.poster_path:PosterFallback
                        return(
                          <div onClick={()=>navigate
                            (`/${item?.media_type||mediaType}/${item?.id}`)} className=''>
                          <MovieCard key={item?.id} posterPath={posterPath} title={item?.title||item?.name} dates={item?.release_date}/></div>
                        )
                      })):(
                        <div className='md:w-[500px] h-[500px] mx-auto flex justify-center items-center flex-shrink w-[100%]'>
                        <img src={noResults} alt="No results" className='w-full h-full'/>
              </div>
                  )}
                  </div>
                  <div className='px-5 py-8 mt-8 bg-[#251e1e] shadow-md shadow-black flex justify-between items-center sm:flex-row flex-col gap-6 sm:gap-0'>

                      <div className='text-white  opacity-50 text-xl'>
                           <h3>{`Showing ${prevPageData} to ${forwardPageData} of ${totalNumPages} results`}</h3>
                      </div>
                      <div className='mr-4 flex'>
                      <button
            className={`py-2 px-4 mx-4 my-2 text-white rounded-lg font-bold flex justify-center items-center ${pageNum>1? 'bg-red-800':'bg-gray-700 text-white cursor-not-allowed'}`} onClick={pageNum>1?onChangePagePrev:null}><i className="fa fa-backward text-white mr-2"></i>Prev</button>
             <button
            className="py-2 px-4 mx-4 my-2 bg-red-700 text-white rounded-lg font-bold flex justify-center items-center" onClick={onChangePageForward}>Next <i className="fa fa-forward text-white ml-2"></i></button>
            
                      </div>
                  </div>
                  </>
                  ):(
                    <div className='flex gap-3 overflow-y-hidden mr-[-20px] ml-[-20px] px-0 py-20  md:gap-5 md:overflow-hidden md:m-0 md:p-0'>
                        
                    </div>
                  )}
        </ContentWrapper>
    </div>
    </>
  )
}

export default Movies