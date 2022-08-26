import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
        'X-RapidAPI-Key': '6ae139b93cmsh2e2d97369f13355p1b37b6jsn840a5b39b960',
        'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        }
    })
    return data
}