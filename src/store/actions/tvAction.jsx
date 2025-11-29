export { removetv } from "../reducers/tvSlice "
import axios from '../../utils/axios'
import { loadtv } from "../reducers/tvSlice ";



export const asyncloadtv = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        const externalid = await axios.get(`https://api.themoviedb.org/3/tv/${id}/external_ids`);
        const recommendations = await axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`);
        const similar = await axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        const translations = await axios.get(`https://api.themoviedb.org/3/tv/${id}/translations`);
        const videos = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        const watchproviders = await axios.get(`https://api.themoviedb.org/3/tv/${id}/watch/providers`);



       


        let theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map((t) => t.english_name),
            videos: videos.data.results.find((m) => m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN,
        };
        dispatch(loadtv(theultimatedetails));
        // console.log(theultimatedetails)
    } catch (error) {
        console.log("Error: ", error);
    }
}