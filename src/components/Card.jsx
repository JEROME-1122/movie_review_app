import { Link } from "react-router-dom";
import  "./card.css"
export function Card({ datas }) {
  return (
    <div className="card shadow shadow-md rounded overflow-hidden bg-white">
      <img
        src={`https://image.tmdb.org/t/p/original${datas.poster_path}`}
        alt={datas.title} title={datas.title}
        className="w-full h-[300px] object-cover"
      />
      <div className="card-body p-4">
        <h3 className="text-lg font-bold mb-2 data_title">{datas.title}</h3>
        <p className="data_overview">{datas.overview}</p>

      
        <p className="text-sm text-gray-600 mb-4">{datas.release_date}</p>
          <div className=" flex items-center justify-between">
              <Link to={`/movies/${datas.id}`}>
          <button className="exbtn  border border-blue-600 py-1 px-3 rounded text-blue-600">
            Explore
          </button>
        </Link>
         <div className="flex items-center ">
           <p>⭐{datas.vote_average}</p> &nbsp; || &nbsp;
        <p>🙍{datas.vote_count} reviews</p>
         </div>
        </div>
      
      </div>
    </div>
  );
}
