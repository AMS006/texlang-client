import { createSlice, current } from "@reduxjs/toolkit";

const  initialState = {
    error: null,
    allUsers:[],
    loading: false,
    user: undefined,
    codeSend: false,
    userData:undefined,
    forgotPassword:false,
    changePassword:false,
    allUserLoading: false,
    projectTabOpen:false,
    forgotPasswordEmail:undefined,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        userRequest:(state) =>{
            state.loading = true
            state.error = null
        },
        getAllUserRequest: (state) => {
            state.allUserLoading = true
        },
        setForgotPasswordEmail:(state,action) =>{
            state.forgotPasswordEmail = action.payload
        },
        setForgotPassword:(state,action)=>{
            state.forgotPassword = action.payload
        },
        setChangePassword:(state,action)=>{
            state.changePassword = action.payload
        },
        setCodeSend: (state, action) => {
            state.codeSend = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setProjectTabOpen:(state,action)=>{
            state.projectTabOpen = action.payload
        },
        setUser:(state,action) =>{
            state.user = action.payload
            state.error = null
            state.loading = false
        },
        setAllUsers: (state, action) => {
            state.allUserLoading = false
            state.allUsers = action.payload
        },
        updateUser:(state,action) =>{
            const users = current(state.allUsers)
            state.allUsers = users.map((user) => {
                if(action.payload.id === user.id)
                    return action.payload
                return user
            })
        },
        clearAllUsers: (state, action) => {
            state.allUsers = []
            state.allUserLoading = false
        },
        clearUser:(state) =>{
            state.user = undefined
            state.loading = false
            state.error = null
        },
        setUserError:(state,action) =>{
            state.user = undefined
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {
    userRequest,
    getAllUserRequest,
    setForgotPasswordEmail,
    setForgotPassword,
    setChangePassword,
    setCodeSend,
    setUserData,
    setProjectTabOpen,
    setUser,
    setAllUsers,
    updateUser,
    clearAllUsers,
    clearUser,
    setUserError,
} = userSlice.actions

export default userSlice.reducer