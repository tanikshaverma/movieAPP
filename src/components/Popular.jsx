
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios';
import { useEffect } from 'react'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import Cards from './partials/Cards'
import InfiniteScroll from 'react-infinite-scroll-component'



const Popular = () => {
    document.title = "Movie App | Popular";
    const navigate = useNavigate();
    const [category, setcategory] = useState("movie");
    const [popular, setpopular] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);



    const GetPopular = async () => {
        try {
            const { data } = await axios.get(`${category}/popular?page=${page}`);

            if (data.results.length > 0) {
                setpopular((prevState) => [...prevState, ...data.results]);
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
        if (popular.length === 0) {
            GetPopular();
        } else {
            setpage(1);
            setpopular([]);
            GetPopular();
        }
    }
    useEffect(() => {
        // GetTrending();
        refersHandler([]);

    }, [category]);

    return popular.length > 0 ? (
        <div className='w-screen h-screen '>

            <div className='px-[5%] w-full flex items-center justify-between'>
                <h1 className='  text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate(-1)} className=" hover:text-[#cd1b84] ri-arrow-left-line"></i>popular</h1>

                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={["tv", "movie"]}
                        func={(e) => setcategory(e.target.value)} />

                    <div className='w-[2%]'></div>
                    {/* <Dropdown
                        title="Duration"
                        options={["week", "day"]}
                        func={(e) => setduration(e.target.value)} /> */}
                </div>


            </div>

            <InfiniteScroll
                dataLength={popular.length}
                next={GetPopular}
                hasMore={hasMore}
                loader={<h1>loading.....</h1>}>

                <Cards data={popular} title={category} />
            </InfiniteScroll>


        </div>
    ) : (<loading />

    );
}

export default Popular