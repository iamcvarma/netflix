import React from "react";
import Image from "next/image";
import { Movie } from "../typings";
import {useRecoilState} from 'recoil'
import {modalState,movieState} from '../atoms/modalAtom'

interface Props {
  movie: Movie// | documentData;
}

function Thumbnail({ movie }: Props) {
  const [showModal,setShowModal] = useRecoilState(modalState);
  const [currMovie,setCurrMovie] = useRecoilState(movieState);

  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 max-w-[200px]"
    onClick={()=>{
      setCurrMovie(movie)
      setShowModal(true)
    }}
    >
      <Image
        className="rounded-sm object-cover md:rounded"
        alt={movie.name}
        fill
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
      />
    </div>
  );
}

export default Thumbnail;
