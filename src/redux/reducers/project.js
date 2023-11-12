import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userProjects:[],
    loading:false,
    error:false,
    latestProjects:[],
    companyProjects: [],
    invoices:[],
    selectedProject:undefined,
}

const projectSlice = createSlice({
    name:"project",
    initialState,
    reducers:{
        projectRequest:(state) =>{
            state.loading = true
            state.selectedProject = undefined
            state.error = false
        },
        setCompanyProjects: (state, action) => {
            state.companyProjects = action.payload
            state.error = false
            state.loading = false
        },
        setLatestProjects: (state, action) => {
            state.latestProjects = action.payload
            state.error = false
            state.loading = false
        },
        setAllProjects:(state,action) =>{
            state.userProjects = action.payload
            state.error = false
            state.loading = false
        },
        setProject:(state,action) =>{
            state.error = false
            state.selectedProject = action.payload
            state.loading = false
        },
        setInvoices:(state,action) =>{
            state.invoices = action.payload
            state.loading = false
        },
        setError:(state) =>{
            state.error=true
            state.loading = false
            state.projects = []
            state.companyProjects = []
            state.latestProjects = []
            state.invoices = []
            state.selectedProject = undefined
        }
    }

})

export const {projectRequest,setAllProjects,setProject,setCompanyProjects,setInvoices,setLatestProjects,setError} = projectSlice.actions

export default projectSlice.reducer