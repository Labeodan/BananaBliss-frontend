import axios from "axios"
import {setToken} from "../utils/token"

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

export const signUp = async (formData) => {
    try {
        const {data} = await axios.post( `${BASE_URL}/signup/`, formData)

        if (data.token) {
            setToken(data.token)
        }
        console.log(data)
        return data
        
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
        
    }
}
export const signIn = async (formData) => {
    try {
        const {data} = await axios.post( `${BASE_URL}/signin/`, formData)
        console.log(data)

        if (data.token) {
            setToken(data.token)
        }
        console.log(data)
        return data
        
    } catch (error) {
        console.log(error.data)
        return(error.data)
        
    }
}