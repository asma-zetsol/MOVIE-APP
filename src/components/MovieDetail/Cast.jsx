import React from 'react'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import Img from './Img'
import { useSelector } from 'react-redux'
import avatar  from '../../assets/avatar.png'
import CastSkeleton from '../SkeletonItems/CastSkeleton'
export default function Cast({cast}) {
    const {url} = useSelector((state)=>state.home)
    if(cast?.results?.length===0){
      return}
  return (
   <>
     <div className='relative bg-black pt-3 pb-5'>
        <ContentWrapper>
           <div className='text-3xl text-white mb-7 font-bold'>
            Top Cast
           </div>
           {cast?(
           <div className='flex gap-5 overflow-y-hidden scrollbar-none scrollbar-hide  mr-[-20px] ml-[-20px]  md:m-0 md:p-0'>
              {cast?.map((item)=>{
                let imgUrl = item.profile_path?url.profile + item.profile_path:avatar
                return (
                    <div key={item.id} className='text-center text-white'>
                        <div className='w-[175px] h-[175px] mb-4'>
                            <Img src={imgUrl}/>
                        </div>
                        <div className='text-sm leading-5 font-semibold md:text-[18px] md:leading-6'>{item.name}</div>
                        <div className='text-sm leading-5 opacity-50 md:text-[16px] md:leading-6'>{item.character}</div>
                    </div>
                )
              })}
           </div>
           ):(
            <div className='flex gap-[20px] overflow-y-hidden -mr-5 -ml-5 px-5 md:m-0 md:p-0 scrollbar-none scrollbar-hide'>
              <CastSkeleton/>
              <CastSkeleton/>
              <CastSkeleton/>
              <CastSkeleton/>
              <CastSkeleton/>
              <CastSkeleton/>
            </div>
           )}
        </ContentWrapper>
     </div>
   </>
    )
}
