import axios from "axios"
import { setPieCharData, setWorkError, setWorks, workRequest } from "../../reducers/work"
import { setHeaders } from "../../../helper/header"
import { clearUser } from "../../reducers/user"

export const getProjectWork = (projectId) => async (dispatch) => {
    try {
        dispatch(workRequest())
        setHeaders()
        const works = await axios({
            method: "GET",
            url: `${import.meta.env.VITE_API_URL}/api/admin/work/projectWork/${projectId}`,
        })
        dispatch(setWorks(works.data.works))
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(setWorkError())
    }
}
export const getInvoiceWork = (projectId) => async (dispatch) => {
    try {
        dispatch(workRequest())
        setHeaders()
        const works = await axios({
            method: "GET",
            url: `${import.meta.env.VITE_API_URL}/api/admin/work/projectWork/invoice/${projectId}`,
        })
        dispatch(setWorks(works.data.works))
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(setWorkError())
    }
}
export const getPieChartData = () => async(dispatch) =>{
    try {
        setHeaders()
       const pieChartData = await axios({
        method:"GET",
        url:`${import.meta.env.VITE_API_URL}/api/admin/work/jobWiseData`,
       })
       dispatch(setPieCharData(pieChartData.data.jobs))
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(setWorkError())
    }
}