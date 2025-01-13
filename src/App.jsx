import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trend from "./components/Trend";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";


const App = () => {
  return (
    <div className=" bg-[#1F1E24] w-screen mh-screen flex">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trend/>} />
        <Route path="/popular" element={<Popular/>} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<Tvshows />} />
        <Route path="/person" element={<People />} />
      </Routes>

    </div>
  )
}



export default App;