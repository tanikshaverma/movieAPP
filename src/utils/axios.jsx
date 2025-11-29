import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
         accept: 'application/json', 
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjM3NjM1YTEzZDg3ODVkMzE1NzhjZGY2OTBkYzQ2MSIsIm5iZiI6MTcyNzk0NjkwMS43NjY1ODUsInN1YiI6IjY2YzliNGM0ODEwNmM0ZjUwYjFkNDM4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UA7AptePd_eB3g7cjabbucdwuFBrF4ZpMr4KKjfMPeU'
     },
})






export default instance;