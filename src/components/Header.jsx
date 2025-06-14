import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

export function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryTerm = e.target.search.value.trim();
    const year = e.target.year.value.trim();
    const genre = e.target.genre.value.trim();

    if (!queryTerm || !year || !genre) {
      alert("Please fill in all fields: search, year, and genre.");
      return;
    }

    e.target.reset();
    return navigate(`/search?q=${queryTerm}&year=${year}&genre=${genre}`);
  };

  return (
    <>
      <nav className="bg-[#000] py-5 navsec">
        <div className="container mx-auto flex justify-between items-center text-white">
          {/* Logo */}
          <div className="nav_logo">
            <Link to="/">
              <h1 className="text-xl">🎥 Movie Park</h1>
            </Link>
          </div>

          {/* Hamburger button for small screens */}
          <button
            className="lg:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Nav Links */}
          <div className="link_sec hidden lg:flex items-center gap-10">
            <div className="nav_link flex gap-5">
              <Link to="/" className="border border-white rounded-xl py-1 px-4 links">
                Home
              </Link>
              <Link to="/movies/toprated" className="links border border-white rounded-xl py-1 px-4">
                Toprated
              </Link>
              <Link to="/movies/popular" className="links border border-white rounded-xl py-1 px-4">
                Popular
              </Link>
              <Link to="/movies/upcoming" className="links border border-white rounded-xl py-1 px-4">
                Upcoming
              </Link>
            </div>
          </div>
        </div>

      {menuOpen && (
          <div className="flex flex-col items-start gap-3 mt-3 lg:hidden w-[90%] mx-auto">
            <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
            <Link to="/movies/toprated" className="text-white hover:text-yellow-300">Toprated</Link>
            <Link to="/movies/popular" className="text-white hover:text-yellow-300">Popular</Link>
            <Link to="/movies/upcoming" className="text-white hover:text-yellow-300">Upcoming</Link>
          </div>
        )}

      </nav>

  
      <div className="search_section my-3 flex flex-col items-center justify-center">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-5 items-center form_sec">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="search_input shadow-md py-3 px-5 border border-gray-200"
          />
          <select name="year" className="search_input1 shadow-md py-3 px-5 border border-gray-200">
            <option value="">Select Year</option>
            {Array.from({ length: 25 }, (_, i) => {
              const y = 2025 - i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
          <select name="genre" className="search_input1 shadow-md py-3 px-5 border border-gray-200">
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700">
            Search
          </button>
        </form>
      </div>
    </>
  );
}
