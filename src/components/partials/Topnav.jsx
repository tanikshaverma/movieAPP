import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../utils/axios';
import { useEffect } from 'react';
import noimage from '/noimage.png';

const Topnav = () => {

  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${query}`);
      // const d = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${query}`);
      setsearches(data.results);
      // console.log(d);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    GetSearches();
  }, [query]);
  return (
    <div className='w-[80%] h-[10vh] relative flex justify-start items-center ml-[15%]'>
      <i className='text-zinc-400 text-3xl ri-search-line'></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className=' w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent' type="text" placeholder='Search anything' />
      {query.length > 0 && (
        <i onClick={() => setquery("")} className=" text-zinc-400 text-3xl ri-close-fill right-0"></i>
      )};

      <div className='absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%]  left-[5%] overflow-auto'>
        {searches.map((s, i) => (
          <Link key={i} className=' hover:text-black hover:bg-zinc-300  duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100'>
            <img className='w-[10vh] object-cover rounded mr-5 shadow-lg'
              src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}` : noimage} alt="" />
            <span>{s.name || s.title || s.original_name || s.original_title}</span>
          </Link>
        ))}


      </div>
    </div>
  );
};

export default Topnav;