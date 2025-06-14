import { useEffect } from "react";
import { Card } from "../components";
import { useFetch } from "../hooks/useFetch";

export function MovieList({ apiPath,title }) {
  const { data: movies } = useFetch(apiPath);
  console.log(apiPath);
useEffect(()=>{
  document.title=title
})
  return (
    <div>
      <div className="container mx-auto my-5 grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
        {movies.map((datas) => (
          <Card key={datas.id} datas={datas} />
        ))}
      </div>
    </div>
  );
}
