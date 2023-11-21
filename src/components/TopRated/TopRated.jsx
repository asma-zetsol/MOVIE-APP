import React,{useState} from 'react'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import SwitchTab from '../SwitchTab/SwitchTab'
import { useMovieFetch } from '../../customHook/useMovieFetch'
import MovieList from '../SecondaryContainer/MovieList'
import Skeleton from '../SkeletonItems/Skeleton'

function TopRated() {
      const [endPoint, setEndPoint] = useState("movie")
    const data = useMovieFetch( `/${endPoint}/top_rated`)
    const onTabChange = (tab) => {
        setEndPoint(tab === 'Movies' ? 'movie' : 'tv')
    }
  return (
    <>
      
      <div className="pb-20 relative z-20 text-white">
                    <ContentWrapper>
                    <div className='flex small:justify-between flex-col gap-5 small:flex-row'>
                            <div className='text-4xl font-bold'>Top Rated</div>
                            <div>
                                <SwitchTab data={['Movies', 'Tv']} onTabChange={onTabChange} />
                            </div>
                        </div>
                        <div>
                        <div className="bg-custom-gray mt-10">
                          {data ?(
                            <div className=" relative z-20">
                            <MovieList movies={data?.results} endPoint={endPoint}/>
                            </div>):(
                      <div className='loadingSkeleton mt-10 scrollbar-none scrollbar-hide'>
                                     <Skeleton/>
                                     <Skeleton/>
                                     <Skeleton/>
                                     <Skeleton/>
                                     <Skeleton/>
                                     <Skeleton/>
                                     <Skeleton/>
                                     <Skeleton/>
                                     <Skeleton/>
                                     <Skeleton/>
                                     <Skeleton/>
                                     <Skeleton/>

                                     </div>
                 )}
                        </div> 
                        </div>
                    </ContentWrapper>
                    </div >)
                   
    </>
  )
}

export default TopRated