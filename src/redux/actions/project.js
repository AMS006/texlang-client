import axios from "axios"
import { projectRequest, setAllProjects, setError, setProject } from "../reducers/project"
import { setWorks } from "../reducers/work"
import { setHeaders } from "../../helper"
import { clearUser } from "../reducers/user"

export const getProjects = () => async(dispatch) =>{
    try {
        dispatch(projectRequest())
        setHeaders()
        const data = await axios({
            method:"GET",
            url: `${import.meta.env.VITE_API_URL}/api/project`,
        })
        
        dispatch(setAllProjects(data.data.projects))
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(setError())
    }
}

export const getProjectDetailsUser = (id) => async(dispatch) =>{
    try {
        setHeaders()
        dispatch(projectRequest())
        const project = await axios({
            method:"GET",
            url: `${import.meta.env.VITE_API_URL}/api/project/${id}`,
        })
        dispatch(setProject(project.data?.project))
        dispatch(setWorks(project.data?.works))
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(setError())
    }
}