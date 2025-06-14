
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const params = useParams();
  const key = "4a40bacb8377a0faf71c17c6a3dc13cb";

  const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${key}`;
  const castURL = `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${key}`;

  useEffect(() => {
    async function getMovieList() {
      try {
        const res = await fetch(url);
        const jsonData = await res.json();
        setMovie(jsonData);
        console.log(jsonData);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    }

    async function getCast() {
      try {
        const res = await fetch(castURL);
        const data = await res.json();
        setCast(data.cast.slice(0, 5)); 
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    }

    getMovieList();
    getCast();
  }, [url, castURL]);

  useEffect(() => {
    if (movie.title) {
      document.title = movie.title;
    }
  }, [movie.title]);

  if (!movie.title) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

      <div className="flex flex-col md:flex-row items-start justify-between gap-5">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          className="md:w-[30%] w-full rounded shadow"
          alt={movie.title}
        />
        <div className="text-left w-full">
          <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
          <p className="mb-4 text-gray-700">{movie.overview}</p>

          {movie.genres && (
            <div className="flex flex-wrap gap-2 mt-3">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-red-600 text-white py-1 px-4 rounded text-sm"
                >
                  <b>{genre.name}</b>
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-5 text-gray-800">
            <p>⭐ {movie.vote_average}</p>
            <p>🙍 {movie.vote_count} reviews</p>
          </div>

          <table className="table w-[100%] lg:w-[50%] border mt-5 w-full text-sm">
            <tbody className="border">
              <tr className="border">
                <th className="border  p-2 text-left">Status</th>
                <td className="p-2">{movie.status}</td>
              </tr>
              <tr className="border">
                <th className="border  p-2 text-left">Revenue</th>
                <td className="p-2">
                  {movie.revenue
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(movie.revenue)
                    : "N/A"}
                </td>
              </tr>
              <tr className="border">
                <th className="border  p-2 text-left">Release Date</th>
                <td className="p-2">{movie.release_date}</td>
              </tr>
            </tbody>
          </table>

     
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Top Cast:</h4>
              <ul className="list-disc ml-5 text-gray-700">
                {cast.map((actor) => (
                  <li key={actor.cast_id}>
                    {actor.name} as <i>{actor.character}</i>
                  </li>
                ))}
              </ul>
            </div>
    

          <a
            href={`https://www.imdb.com/title/${movie.imdb_id}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-yellow-500 py-2 px-4 rounded mt-5 text-white hover:bg-yellow-600 transition">
              View in IMDb
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
