
// const BASE_URL = 'https://api.themoviedb.org/3'
import { useEffect, useState } from 'react';
import { API_OPTIONS } from "../utility/Constants";
export const useMovieFetch = (url,params="") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
       setLoading(true)
       setData(null)
    // setMovieData("")
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3"+url,
          API_OPTIONS
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const movieData = await response.json();
        // setMovieData(data)
        setLoading(false)
        setData(movieData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, [url]); // Empty dependency array ensures this effect runs once on component mount

  return data
  
};
