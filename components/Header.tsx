import Link from "next/link";
import { useState, useEffect } from "react";
import Router  from "next/router";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const {logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [query,setQuery] = useState('')
  const handleSearch=()=>{
    if (query){
      Router.push(`/search/${query}`)
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? "bg-[#141414]" : ""}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href={'/'}>
        
        <img
          src="../images/logo.svg"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
          alt="logo"
        />
        </Link>
        <ul className="hidden space-x-2 md:flex">
          <Link href={"/"}>
            <li className="headerLink">Home</li>
          </Link>
          <Link href={"/tvshows"}>
            <li className="headerLink">TV Shows</li>
          </Link>

          <Link href={"/movies"}>
            <li className="headerLink">Movies</li>
          </Link>
          <Link href={"/new"}>
            <li className="headerLink">New & Popular</li>
          </Link>
          <Link href={"/list"}>
            <li className="headerLink">My List</li>
          </Link>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light ">
        <div >
          <input 
          type="text" 
          className="w-[15vw]  h-10 p-2 py-2 font-semibold text-xl hidden md:inline-block outline-none rounded-lg bg-[#333]/30 filter:bg-blur placeholder:text-[gray] placeholder:font-thin"
          placeholder="Search..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          onKeyDown={e=>{
            if(e.key=='Enter')
            handleSearch()
          }}
          />
        </div>
        <button
        onClick={handleSearch}
        >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=" hidden sm:inline w-6 h-6"
          
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        </button>
        <p className="hidden lg:inline">Kids</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
        <button
        onClick={logOut}
        >
          <img src="../images/user.png" />
        </button>
      </div>
    </header>
  );
};

export default Header;
