import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './components/Login/Login'
import Browse from './components/Body/Browse'
import Layout from './Layout'
import { getApiConfiguration,getGenres} from './features/Home/HomeSlice'
import MovieDetail from './components/MovieDetail/MovieDetail'
import Search from './components/Search/Search'
import Movies from './components/Movies/Movies'
import { fetchDataFromapi } from './utility/api'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
       <Route path='' element={<Login/>}/>
       <Route path='browse' element={<Browse/>}/>
       <Route path='/:mediaType/:id' element={<MovieDetail/>}/>
       <Route path='/search/:query' element={<Search/>}/>
       <Route  path='/explore/:mediaType' element={<Movies/>}/>
    </Route> 
  )
)
function App() {
   const dispatch = useDispatch()
   const fetchConfig = async()=>{
      const response = await fetch('https://api.themoviedb.org/3/configuration?api_key=5b7730884dfbf526c12a65d01fb5d820')
      const data =  await response.json()
      const url = {
         backdrop: data?.images?.secure_base_url + "original",
         poster: data?.images?.secure_base_url + "original",
         profile: data?.images?.secure_base_url + "original",
     };
       dispatch(getApiConfiguration(url))
   }
   const genresCall = async ()=>{
    let promises = []
    let endPoints = ["tv","movie"]
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromapi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises)
    data.map(({genres})=>(
      genres.map((item)=>allGenres[item.id]=item)
    ))
    dispatch(getGenres(allGenres))
   }
   useEffect(()=>{
       fetchConfig()
       genresCall()
   },[])

  return (
   <>
         <RouterProvider router={router}/>
   </>
    )
}

export default App