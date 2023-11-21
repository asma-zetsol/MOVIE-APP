import { API_OPTIONS } from "../utility/Constants";
import axios from "axios";
const headers = {
  Authorization: "Bearer " + import.meta.env.VITE_REACT_APP_API_KEY,
}
const BASE_URL = "https://api.themoviedb.org/3"
export const fetchDataFromapi = async (url,params) => {
    try {
      // const response = await fetch(`https://api.themoviedb.org/3${url}`,
      //     API_OPTIONS
      // );
      const { data } = await axios.get(BASE_URL + url, {
        headers,
        params,
    });
     return data;
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      // const data = await response.json();
      // return data
        } catch (error) {
      console.error("Error fetching movie data:", error);
      return error
    }
  };
