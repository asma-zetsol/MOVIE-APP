import React from 'react'

function Movie({title,data,onTabChange}) {
  return (
    <>
       <div className=" mt-[140px]  relative z-20 text-white border border-teal-800 md:pt-10 pb-5">
                    <ContentWrapper>
                        <div className='flex justify-between'>
                            <div className='text-4xl font-bold'>{title}</div>
                            <div>
                                <SwitchTab data={['Day', 'Week']} onTabChange={onTabChange} />
                            </div>
                        </div>
                        <div>
                        <div className="bg-black">
                            <div className=" mt-10 relative z-20">
                            <MovieList movies={data} />
                            </div>
                        </div>
                        </div>
                    </ContentWrapper>
                    
                       </div >
    </>
  )
}

export default Movie