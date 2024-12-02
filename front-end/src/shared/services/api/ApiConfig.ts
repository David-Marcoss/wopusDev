import axios from "axios"

export const api = () => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        timeout: 10000 
    })
}