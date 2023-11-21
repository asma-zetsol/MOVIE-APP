import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllMovies } from '../../features/movies/movieSlice'
import Trending from '../Trending/Trending'
import WhatsPopular from '../WhatsPopular/WhatsPopular'
import TopRated from '../TopRated/TopRated'

function SecondaryContainer() {
    const movies = useSelector(getAllMovies)
    
    
    return (
        <>
            <div className="bg-custom-gray">
               <Trending/>
               <WhatsPopular/>
               <TopRated/>
        </div >
        </>
)
}

export default SecondaryContainer