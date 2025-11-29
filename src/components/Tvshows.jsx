import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios';
import { useEffect } from 'react'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import Cards from './partials/Cards'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from './Loading';


const Tvshows = () => {
    document.title = "Movie App | Tv Shows";
    const navigate = useNavigate();
    const [category, setcategory] = useState("airing_today");
    const [tv, settv] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);



    const GetTv = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`);

            if (data.results.length > 0) {
                settv((prevState) => [...prevState, ...data.results]);
                setpage(page + 1);
            } else {
                sethasMore(false);
            }

            // settrending(data.results);


        } catch (error) {
            console.log("Error:", error);
        }
    };
    // console.log(trending);
    const refersHandler = () => {
        if (tv.length === 0) {
            GetTv();
        } else {
            setpage(1);
            settv([]);
            GetTv();
        }
    }
    useEffect(() => {
        // GetTrending();
        refersHandler([]);

    }, [category]);
    return tv.length > 0 ? (
        <div className='w-screen h-screen '>

            <div className='px-[5%] w-full flex items-center justify-between'>
                <h1 className='  text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate(-1)} className=" hover:text-[#cd1b84] ri-arrow-left-line"></i>
                    Tv<small className='ml-2 text-sm text-zinc-600'>({category})</small>
                </h1>

                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={["on_the_air", "popular", "top_rated", "airing_today"]}
                        func={(e) => setcategory(e.target.value)} />

                    <div className='w-[2%]'></div>
                    {/* <Dropdown
                        title="Duration"
                        options={["week", "day"]}
                        func={(e) => setduration(e.target.value)} /> */}
                </div>


            </div>

            <InfiniteScroll
                dataLength={tv.length}
                next={GetTv}
                hasMore={hasMore}
                loader={<h1>loading.....</h1>}>

                <Cards data={tv} title="tv" />
            </InfiniteScroll>


        </div>
    ) : (<Loading />);

  
}

export default Tvshows