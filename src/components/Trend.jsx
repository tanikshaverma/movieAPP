import React, { useEffect } from 'react'
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import axios from '../utils/axios'
import Cards from './partials/Cards'

const Trend = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
 const [duration, setduration] = useState("day");
 const [trending, settrending] = useState([]);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`);



      settrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };
console.log(trending);
  useEffect(() =>{
    GetTrending();

  },{category, duration});


  return  trending.length > 0 ?(
    <div className='w-screen h-screen px-[3%] overflow-hidden overflow-y-auto'>
  
      <div className='w-full flex items-center'>
        <h1 className='text-2xl font-semibold text-zinc-400'>
          <i onClick={() => navigate(-1)} class=" hover:text-[#cd1b84] ri-arrow-left-line"></i>Trending</h1>
     

        <Topnav />
        <Dropdown
         title="Category" 
         options={["movie", "tv", "all"]}
          func={(e)=> setcategory(e.target.value)} />
     
     <div className='w-[2%]'></div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setduration(e.target.value)} />
     
     
     
     
     
      </div>
      
      <Cards data={trending} title={category} />


    </div>
  ) :( <loading />

  );
}

export default Trend




