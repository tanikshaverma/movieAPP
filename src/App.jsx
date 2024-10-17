import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trend from "./components/Trend";


const App = () => {
  return (
    <div className=" bg-[#1F1E24] w-screen mh-screen flex">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trend/>} />
      </Routes>

    </div>
  )
}



export default App;