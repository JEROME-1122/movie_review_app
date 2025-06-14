import { Route, Routes } from "react-router-dom";
import { Footers, Header } from "./components";
import { MovieList,TopRated,UpcomingMovies,PopularMovies, MovieDetails, SearchList } from "./pages";

// import PopularMovies from "./pages/PopularMovies";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MovieList title="Now playing movies " apiPath="movie/now_playing" />} />
        <Route path="/movies/popular" element={<PopularMovies title="Popular movies " apiPath="movie/popular" />} />
        <Route path="/movies/toprated" element={<TopRated title="Top rated movies " apiPath="movie/top_rated" />} />
        <Route path="/movies/upcoming" element={<UpcomingMovies title="Up coming movies " apiPath="movie/upcoming" />} />
         <Route path="/movies/:id" element={<MovieDetails  />} />
         <Route path="search" element={<SearchList apiPath="search/movie"  />} />
      </Routes>
      <Footers />
    </div>
  );
}

export default App;
