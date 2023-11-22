import axios from "axios"
import { projectRequest, setCompanyProjects, setError, setLatestProjects, setProject } from "../../reducers/project"
import { setHeaders } from "../../../helper"
import { clearUser } from "../../reducers/user"

export const getCompanyProjects = () => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        setHeaders()
        const data = await axios({
            method:"GET",
            url: `${import.meta.env.VITE_API_URL}/api/admin/project/companyProjects`,
        })
        
        dispatch(setCompanyProjects(data.data.projects))
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(setError())
    }
}

export const getLatestProjects = () => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        setHeaders()
        const data = await axios({
            method:"GET",
            url: `${import.meta.env.VITE_API_URL}/api/admin/project/latestProjects`,
        })
        
        dispatch(setLatestProjects(data.data.projects))
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(setError())
    }
}

export const getProjectDetailsAdmin = (id) => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        setHeaders()
        const project = await axios({
            method:"GET",
            url: `${import.meta.env.VITE_API_URL}/api/admin/project/projectDetail/${id}`,
        })
        dispatch(setProject(project.data.project))
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(setError())
    }
}

