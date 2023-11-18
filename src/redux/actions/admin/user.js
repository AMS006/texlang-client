import axios from "axios"
import { clearAllUsers, clearUser, getAllUserRequest, setAllUsers } from "../../reducers/user"
import { setHeaders } from "../../../helper"

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(getAllUserRequest())
        setHeaders()
        const users = await axios({
            method: "GET",
            url: `${import.meta.env.VITE_API_URL}/api/admin/user/allUsers`,
        })
        if (users)
                dispatch(setAllUsers(users.data.users))
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(clearAllUsers())
    }
}