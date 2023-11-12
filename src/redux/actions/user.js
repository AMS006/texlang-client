import axios from "axios"
import { clearUser, setUser, setUserError, userRequest } from "../reducers/user"
import { setHeaders } from "../../helper/header"

export const LoginUser = (data) => async(dispatch) =>{
    try {
        dispatch(userRequest())
        const res = await axios({
            method: "POST",
            data,
            url: `${import.meta.env.VITE_API_URL}/api/user/login`,
        })
        
        localStorage.setItem("texlang-auth-token",res.data.token)
        dispatch(setUser(res.data.user));
        return res;
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(setUserError(error?.response?.data?.message))
    }
}
export const getUser = () => async(dispatch) =>{
    try {
        dispatch(userRequest())
        setHeaders()
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`)
        dispatch(setUser(res.data.user))
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(clearUser())
    }
}
export const logoutUser = () => async (dispatch) => {
    dispatch(clearUser())
    localStorage.removeItem("texlang-auth-token")
}
   