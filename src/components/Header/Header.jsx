import React, { useEffect, useState } from 'react'
import { LOGO, USER_AVATAR, mobileLogo } from '../../utility/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Auth } from '../../config/firebase'
import { addUser, removeUser } from '../../features/user/userSlice'
import { Link, NavLink } from 'react-router-dom'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import netflixMobileLogo from '../../assets/netflix.png'
function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showSearch, setShowSearch] = useState("")
  const [query, setQuery] = useState("")
  const[mobileMenu,setMobileMenu] = useState(false)
  const [menuOpen,setMenuOpen] = useState(false)
  const user = useSelector((store) => store.user.userData)
  const loading = useSelector((store)=>store.user.loading)
  const openSearch = () => {
    setShowSearch(true)
  }
  const closeSearch = () => {
    setShowSearch(false)
  }
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
      setTimeout(() => {
        setShowSearch(false)
        setQuery("")
      }, 1000)
    }
  }
  const handleSignOut = () => {
    signOut(Auth)
    setMobileMenuOpen(false)
    setMenuOpen(!menuOpen)
    navigate("/")
      .then(() => { })
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user
        dispatch(addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL
        }))
        navigate("/browse")
      } else {
        dispatch(removeUser())
        navigate("/")
      }
      return () => unSubscribe()
    })
  }, [])
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="absolute top-0 w-full md:bg-gr
    adient-to-b from-black p-2 z-50 bg-black">
      <div className="w-full mx-auto flex 
      justify-between items-center">
      <Link to="/" className="">
        <img src={LOGO} alt="logo" className='w-40 
        ml-12 wide:w-44 sm:inline-block hidden'/>
        <img src={netflixMobileLogo} alt="logo" className='w-20 sm:hidden block mt-1 small:ml-9 m-0'/>
      </Link>

        {/* Mobile Menu Button */}
        {user && (
          <>
        <div className="lg:hidden">
        <button type="submit"><i className="fa fa-search text-5xl text-red-500  hover:text-white mr-6" onClick={openSearch}></i></button>
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none small:mr-12 mr-2"
          >
           <i className="fa fa-bars text-white text-5xl"></i>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6  items-center mr-9 w-[65%] justify-between">
          <div className='flex gap-16'>
          <NavLink to="/browse"
              className={({ isActive }) => 
                `block py-2 ${isActive ? "text-white" : "text-gray-700"} font-bold fs text-2xl	text-red-500 hover:text-white lg:p-0 cursor-pointer`
              }
            >  Home
          </NavLink>
          <NavLink to="/explore/movie"
              className={({ isActive }) => 
                `block py-2 ${isActive ? "text-white" : "text-gray-700"} font-bold fs text-2xl	text-red-500 hover:text-white lg:p-0 cursor-pointer`
              }
            >
              Movies
            </NavLink>
            <NavLink to="/explore/tv"
              className={({ isActive }) =>
                `block py-2  ${isActive ? "text-white" : "text-gray-700"} font-bold fs text-2xl	text-red-500 hover:text-white lg:p-0 cursor-pointer`
              }
            >
              TV 
            </NavLink>
          </div>
          <div className='flex gap-6'>
        <button type="submit"><i className="fa fa-search text-4xl text-red-500  hover:text-white wide:inline-block" onClick={openSearch}></i></button>
           
            <div
              className='flex cursor-pointer relative'
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}>
              {!loading?(
                <img
                className=" w-12 h-12 rounded-full"
                alt="usericon"
                src={user.photoURL}
              />
              ):(
                <div className='w-12 h-12 rounded-full skeleton'></div>
              )}
              {/* */}
              <i className="fa fa-chevron-down text-sm px-1 my-auto text-white border-white rounded-full border-2 ml-1"></i>

            </div>
            </div>
            <div
          className={`z-50 absolute right-7 rounded-xl w-[150px] ${mobileMenu?"top-[290px]":"top-[80px]"} border-white border-2 ${
            menuOpen ? "flex flex-col justify-evenly items-center" : "hidden"
          } bg-custom-gray h-[200px]`}>
          <p className='text-white bg-brand-purple px-1 py-1 text-center border-b'>
           <span className='text-red-500 font-bold'> Welcome </span> , {user?.displayName}
          </p>

          <Link to={"/"}>
            <p className='text-white cursor-pointer text-center border-b w-[150px] my-auto px-1 py-1 font-bold hover:opacity-80 text-lg'>Home</p>
          </Link>
          {/* <Link to={"/about"}>
            <p className='text-white cursor-pointer text-center'>About</p>
          </Link> */}

<button
              className="py-2 px-4 mx-4 my-2 bg-red-700 text-white rounded-lg hover:opacity-80" onClick={handleSignOut}>Sign Out</button>
        </div>
        </div>

        {/* Mobile Menu */}
        <div className={`z-50 lg:hidden fixed top-0 right-0 h-full w-64 bg-black pl-9 pt-6 transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={()=>menuOpen?setMenuOpen(!menuOpen):""}>
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <div className="flex flex-col space-y-4">
          <NavLink to="/"
              className={({ isActive }) => 
                `block py-2 ${isActive ? "text-white" : "text-gray-700"} font-bold fs text-2xl	text-red-500 hover:text-white lg:p-0 cursor-pointer`
              }
            >  Home
          </NavLink>
          <NavLink to="/explore/movie"
              className={({ isActive }) => 
                `block py-2 ${isActive ? "text-white" : "text-gray-700"} font-bold fs text-2xl	text-red-500 hover:text-white lg:p-0 cursor-pointer`
              }
            >
              Movies
            </NavLink>
            <NavLink to="/explore/tv"
              className={({ isActive }) =>
                `block py-2  ${isActive ? "text-white" : "text-gray-700"} font-bold fs text-2xl	text-red-500 hover:text-white lg:p-0 cursor-pointer`
              }
            >
              TV 
            </NavLink>
            <div
              className='flex cursor-pointer relative'
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}>
              <img
                className=" w-12 h-12 rounded-full"
                alt="usericon"
                src={user?.photoURL}
              />
              {/* */}
              <i className="fa fa-chevron-down text-sm px-1 my-auto text-white border-white rounded-full border-2 ml-1"></i>
            </div>
          </div>
          <div
          className={`z-50 absolute right-7 rounded-xl w-[150px] top-[290px] border-white border-2 left-6 ${
            menuOpen ? "flex flex-col justify-evenly items-center" : "hidden"
          } bg-custom-gray h-[200px]`}>
          <p className='text-white bg-brand-purple px-1 py-1 text-center border-b'>
           <span className='text-red-500 font-bold'> Welcome </span> , {user?.displayName}
          </p>

          <Link to={"/"}>
            <p className='text-white cursor-pointer text-center border-b w-[150px] my-auto px-1 py-1 font-bold hover:opacity-80 text-lg'>Home</p>
          </Link>
          {/* <Link to={"/about"}>
            <p className='text-white cursor-pointer text-center'>About</p>
          </Link> */}

<button
              className="py-2 px-4 mx-4 my-2 bg-red-700 text-white rounded-lg hover:opacity-80" onClick={handleSignOut}>Sign Out</button>
        </div>
        </div>
        </>
        )}
      </div>
      {showSearch && (<div className='w-[100%] bg-white absolute  border border-red-800 p-3 left-0 top-12 wide:top-16 mt-6'>
        <div className='flex items-center  mt-[10px] w-full'>
          <input type="text" placeholder='Search for a movie or Tv Shows.....' className='w-full h-[30px] bg-white outline-none border-0 rounded-l-[30px] rounded-t-[30px] py-4 pl-4 text-sm md:h-[40px] md:text-2xl md:py-4 md:pl-8' onChange={e => setQuery(e.target.value)} onKeyUp={searchQueryHandler} />
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className='text-2xl  cursor-pointer text-black hover:opacity-50' onClick={closeSearch}><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
        </div>
      </div>)}
    </nav>
  );
};

export default Header;