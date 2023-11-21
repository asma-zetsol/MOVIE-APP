import React,{useState} from 'react'
import Movie from '../SecondaryContainer/Movie'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import SwitchTab from '../SwitchTab/SwitchTab'
import { useMovieFetch } from '../../customHook/useMovieFetch'
import MovieList from '../SecondaryContainer/MovieList'
import Skeleton from '../SkeletonItems/Skeleton'

function Trending() {
    const [endPoint, setEndPoint] = useState("day")
    const data = useMovieFetch( `/trending/all/${endPoint}`)
    const onTabChange = (tab) => {
        setEndPoint(tab === 'Day' ? 'day' : 'week')
    }
  return (
    <>
      <div className="relative text-white pt-10 pb-20 bg-custom-gray">
                    <ContentWrapper>
                        <div className='flex small:justify-between flex-col gap-5 small:flex-row'>
                            <div className='text-4xl font-bold'>Trending</div>
                            <div>
                                <SwitchTab data={['Day', 'Week']} onTabChange={onTabChange} />
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
                    </div >
    </>
    )
}

export default Trending