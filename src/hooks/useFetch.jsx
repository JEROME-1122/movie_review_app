import { useState, useEffect } from "react";

export function useFetch(apiPath, queries = "") {
  const [data, setData] = useState([]);

  const key = "4a40bacb8377a0faf71c17c6a3dc13cb";
  let url = `https://api.themoviedb.org/3/${apiPath}?api_key=${key}`;
  if (queries) {
    url += `&query=${queries}`;
  }

  console.log("Fetching from:", url);

  useEffect(() => {
    async function getMovieList() {
      try {
        const res = await fetch(url);
        const jsonData = await res.json();
        setData(jsonData.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    }
    getMovieList();
  }, [url]);

  return { data };
}
