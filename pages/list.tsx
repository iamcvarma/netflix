import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import requests from "../utils/requests";
import { movieList } from "../atoms/modalAtom";
import { Movie } from "../typings"; 
import Thumbnail from "../components/Thumbnail";
import Modal from '../components/Modal'
import {useRecoilValue} from 'recoil'

function movies() {
  const list:Movie[] = useRecoilValue(movieList)

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="p-4 grid place-content-center" >
        <h1 className="mt-20 md:text-7xl text-3xl font-bold pl-2">Your List</h1>
        <div className="relative mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {list?.map((movie) => (
            <div className="m-4 flex flex-col max-w-[300px]">
              <Thumbnail movie={movie} key={movie.id} />
              <h2 className="font-semibold mt-1 text-xl">{movie?.title}</h2>
            </div>
          ))}
          
        </div>
      </main>
      <Modal />
    </div>
  );
}

export default movies;

