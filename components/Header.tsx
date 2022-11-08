import Link from "next/link";
import { useState,useEffect } from "react";

const Header = () => {
    const [isScrolled ,setIsScrolled] = useState(false)
    useEffect(() => {
      const handleScroll = ()=>{
        if (window.scrollY>0){
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
      }
      window.addEventListener('scroll',handleScroll)
      return () => {
        window.removeEventListener('scroll',handleScroll)
      }
    }, [])
    
  return (
    <header className={isScrolled?'bg-[#141414]':''}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="images/logo.svg"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
          alt="logo"
        />
        <ul className="hidden space-x-2 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
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
        <Link href="/account">
           <img src = 'images/user.png'/>
        </Link>
      </div>
    </header>
  );
};

export default Header;
