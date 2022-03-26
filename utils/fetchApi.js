import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const {data} = await axios.get((url), {
         headers: {
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
            'X-RapidAPI-Key': 'ae526e1dccmsh35a6da848a69aafp1c6e57jsn97aa0c700e2d'
        }
    })
    return data; 
}