// app.jsx
import { Route, Routes } from "react-router-dom";
import { Footers, Header } from "./components";
import { MovieList,TopRated,UpcomingMovies,PopularMovies, MovieDetails } from "./pages";

// import PopularMovies from "./pages/PopularMovies";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MovieList apiPath="movie/now_playing" />} />
        <Route path="/movies/popular" element={<PopularMovies apiPath="movie/popular" />} />
        <Route path="/movies/toprated" element={<TopRated apiPath="movie/top_rated" />} />
        <Route path="/movies/upcoming" element={<UpcomingMovies apiPath="movie/upcoming" />} />
         <Route path="/movies/moviedetails:id" element={<MovieDetails apiPath="movie/upcoming" />} />
      </Routes>
      <Footers />
    </div>
  );
}

export default App;


// Header.jsx


import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (search) query.append("search", search);
    if (genre) query.append("genre", genre);
    if (year) query.append("year", year);
    navigate(`/?${query.toString()}`);
  };

  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];
  const years = Array.from({ length: 15 }, (_, i) => 2024 - i); 

  return (
    <>
      <nav className="bg-[#000] py-5">
        <div className="container mx-auto flex justify-between text-[#fff]">
          <div className="nav_logo">
            <Link to="/">
              <p>Logo</p>
            </Link>
          </div>
          <div className="link_sec flex items-center gap-10">
            <div className="nav_link flex gap-5">
              <Link to="/">Home</Link>
              <Link to="/movies/toprated">Toprated</Link>
              <Link to="/movies/popular">Popular</Link>
              <Link to="/movies/upcoming">Upcoming</Link>
            </div>
          </div>
        </div>
      </nav>

      <form
        onSubmit={handleSubmit}
        className="search_section my-3 flex flex-col md:flex-row items-center justify-center gap-3"
      >
        <input
          type="search"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 py-2 px-4 border border-gray-300 rounded"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="py-2 px-4 border border-gray-300 rounded"
        >
          <option value="">Select Genre</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="py-2 px-4 border border-gray-300 rounded"
        >
          <option value="">Select Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-5 rounded hover:bg-blue-700"
        >
          Filter
        </button>
      </form>
    </>
  );
}


// useFetch.jsx

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



// pages/MovieList.jsx

import { Card } from "../components";
import {useFetch} from "../hooks/useFetch";

export function MovieList({ apiPath }) {
  const { data: movies } = useFetch(apiPath); // apiPath is now a string
console.log(apiPath)
  return (
    <div>
      <div className="container mx-auto my-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {movies.map((datas) => (
          <Card key={datas.id} datas={datas} />
        ))}
      </div>
    </div>
  );
}


// Card.jsx

import { Link } from "react-router-dom";
import  "./card.css"
export function Card({ datas }) {
  return (
    <div className="card shadow shadow-md rounded overflow-hidden bg-white">
      <img
        src={`https://image.tmdb.org/t/p/w500${datas.poster_path}`}
        alt={datas.title}
        className="w-full h-[300px] object-cover"
      />
      <div className="card-body p-4">
        <h3 className="text-lg font-bold mb-2">{datas.title}</h3>
        <p className="data_overview">{datas.overview}</p>

        <p>{datas.vote_count}</p>
        <p className="text-sm text-gray-600 mb-4">{datas.release_date}</p>
        <Link to={`/movies/moviedetails/${datas.id}`}>
          <button className="bg-blue-600 py-1 px-3 rounded text-white">
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
}

