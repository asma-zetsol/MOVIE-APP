import ContentWrapper from '../ContentWrapper/ContentWrapper'
import { useMovieFetch } from '../../customHook/useMovieFetch'
import MovieList from '../SecondaryContainer/MovieList'
import Skeleton from '../SkeletonItems/Skeleton'
function SimilarMovies({mediaType,id}) {
    const data = useMovieFetch(`/${mediaType}/${id}/similar`)
    if(data?.results.length===0){
        return}
  return (
    <>
      
      <div className="relative z-20 text-white pt-10 bg-custom-gray pb-10">
                    <ContentWrapper>
                            <div className='text-4xl font-bold'>Similar Movies</div>
                        <div>
                        <div className="bg-custom-gray">
                            <div className=" mt-10 relative z-20">
                            {data?(
                            <MovieList movies={data?.results} endPoint={mediaType} />)
                            :( 
                                <div className='loadingSkeleton scrollbar-none scrollbar-hide'>
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
                        </div>
                    </ContentWrapper>
                    </div>
    </>
    )
}

export default SimilarMovies