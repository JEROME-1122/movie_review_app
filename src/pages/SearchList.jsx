import { useSearchParams } from "react-router-dom";
import { Card } from "../components";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";

export function SearchList({apiPath}) {
  const [searchParams]=useSearchParams()
  const queryTerm=searchParams.get("q");
  const {data:movies}=useFetch(apiPath,queryTerm);
  useEffect(()=>{
    document.title=`Search result for ${queryTerm}`;
  })
  return (
    <main className="container mx-auto">
      <h5>Searching List</h5>
        <div className="container mx-auto my-5 grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
        {movies.map((datas) => (
          <Card key={datas.id} datas={datas} />
        ))}
      </div>
    </main>
  )
}


