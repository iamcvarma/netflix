import React from "react";
import {Movie} from '../../typings' 
import Head from 'next/head'
import Header from '../../components/Header'
import Thumbnail from "../../components/Thumbnail";
import Modal from "../../components/Modal";
function searchPage({searchResults,searchQuery}:{searchResults:Movie[],searchQuery:string}) {
  return(
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="p-4 grid place-content-center" >
        <h1 className="mt-20 md:text-7xl text-3xl font-bold pl-2">Search Results for "{searchQuery}"</h1>
        <div className="relative mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {searchResults?.map((movie) => (
            <div className="m-4 flex flex-col max-w-[300px]">
              <Thumbnail movie={movie} key={movie.id} />
              <h2 className="font-semibold mt-1 text-xl">{movie?.title || movie?.name }</h2>
            </div>
          ))}
        </div>
      </main>
      <Modal />
    </div>
  )
}

export default searchPage;

export const getServerSideProps = async ({
  params,
}: {
  params: { searchTerm: string };
}) => {
  const searchResults = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${params.searchTerm}&page=1&include_adult=true`
  ).then(res=>res.json());
  console.log(searchResults)
  return {
    props: {
        searchResults:searchResults.results,
        searchQuery:params.searchTerm
    },
  };
};
