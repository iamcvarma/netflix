import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import requests from "../utils/requests";
import { Movie } from "../typings";
import Thumbnail from "../components/Thumbnail";
import Modal from '../components/Modal'

interface Props {
  topShows: Movie[];
}

function movies({ topShows }: Props) {
  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="p-4 grid place-content-center" >
        <h1 className="mt-20 md:text-7xl text-3xl font-bold pl-2">TV Shows</h1>
        <div className="relative mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {topShows?.map((show) => (
            <div className="m-4 flex flex-col max-w-[300px]">
              <Thumbnail movie={show} key={show.id} />
              <h2 className="font-semibold mt-1 text-xl">{show?.title || show?.original_name}</h2>
            </div>
          ))}
        </div>
      </main>
      <Modal />
    </div>
  );
}

export default movies;

export const getServerSideProps = async () => {
  const topshows = await fetch(requests.fetchTopTvShows).then((res) =>
    res.json()
  );

  return {
    props: {
      topShows: topshows.results,
    },
  };
};
