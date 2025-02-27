import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios';
import { useEffect } from 'react'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import Cards from './partials/Cards'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from './Loading';

const Movie = () => {
    document.title = "Movie App | Movies";
    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);



    const GetMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`);

            if (data.results.length > 0) {
                setmovie((prevState) => [...prevState, ...data.results]);
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
        if (movie.length === 0) {
            GetMovie();
        } else {
            setpage(1);
            setmovie([]);
            GetMovie();
        }
    }
    useEffect(() => {
        // GetTrending();
        refersHandler([]);

    }, [category]);

    return movie.length > 0 ? (
        <div className='w-screen h-screen '>

            <div className='px-[5%] w-full flex items-center justify-between'>
                <h1 className='  text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate(-1)} className=" hover:text-[#cd1b84] ri-arrow-left-line"></i>
                    Movie<small className='ml-2 text-sm text-zinc-600'>({category})</small> 
                    </h1>

                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={["popular","top_rated","upcoming","now_playing"]}
                        func={(e) => setcategory(e.target.value)} />

                    <div className='w-[2%]'></div>
                    {/* <Dropdown
                        title="Duration"
                        options={["week", "day"]}
                        func={(e) => setduration(e.target.value)} /> */}
                </div>


            </div>

            <InfiniteScroll
                dataLength={movie.length}
                next={GetMovie}
                hasMore={hasMore}
                loader={<h1>loading.....</h1>}>

                <Cards data={movie} title="movie" />
            </InfiniteScroll>


        </div>
    ) : (<Loading />);
}

export default Movie