import { useState, useEffect } from "react";
import Image from "next/image";
import { Movie } from "../typings";
import { baseUrl } from "../constans/movieUrl";
import { FaPlay } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import {modalState,movieState} from '../atoms/modalAtom'
import {useRecoilState} from 'recoil'
interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal,setShowModal] = useRecoilState(modalState);
  const [currentMovie,setCurrentMovie] = useRecoilState(movieState)

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, []);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 ld:h-[65vh] lg:justify-end lg:pb-12">
      {movie && (
        <>
          <div className="absolute top-0 left-0 w-screen h-[95vh] -z-10 ">
            <Image
              src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
              layout="fill"
              objectFit="cover"
              alt="banner images"
            />
          </div>
          <h1 className="text-2xl lg:text-7xl md:text-4xl text-shadow-md">
            {movie.title || movie.name || movie.original_name}
          </h1>
          <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl text-shadow-sm">
            {movie.overview}
          </p>
          <div className="flex gap-x-4">
            <button className="bannerButton bg-white text-black">
              <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
              Play
            </button>
            <button 
            className="bannerButton bg-gray-400/70"
            onClick={()=>{
              setCurrentMovie(movie)
              setShowModal(true)
            }}
            >
              More Info
              <HiInformationCircle className="text-white h-5 w-5 md:h-8 md:w-8" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;
