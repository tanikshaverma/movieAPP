export { removeperson } from "../reducers/personSlice"
import axios from '../../utils/axios'
import { loadperson } from "../reducers/personSlice";



export const asyncloadperson = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`https://api.themoviedb.org/3/person/${id}`);
        const externalid = await axios.get(`https://api.themoviedb.org/3/person/${id}/external_ids`);
        const combinedCredits = await axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits`);
        const tvCredits = await axios.get(`https://api.themoviedb.org/3/person/${id}/tv_credits`);
        const movieCredits = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits`);

        let theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            combinedCredits: combinedCredits.data,
            tvCredits: tvCredits.data,
            movieCredits: movieCredits.data,
        };
        dispatch(loadperson(theultimatedetails));
        // console.log(theultimatedetails)
    } catch (error) {
        console.log("Error: ", error);
    }
}