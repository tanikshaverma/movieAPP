import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trend from "./components/Trend";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import Moviedetails from "./components/Moviedetails";
import TvDetails from "./components/TvDeatails";
import PersonDetails from "./components/PersonDetails"
import Trailer from "./components/partials/Trailer";
import Notfound from "./components/Notfound";

const App = () => {
  return (
    <div className=" bg-[#1F1E24] w-screen flex">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trend />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<Moviedetails />} >
        <Route path="/movie/details/:id/trailer" element= {<Trailer />} />

        </Route>
        <Route path="/tv" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<TvDetails />} >
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />

        </Route>
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="*" element= {<Notfound />} />


      </Routes>

    </div>
  );
};



export default App;