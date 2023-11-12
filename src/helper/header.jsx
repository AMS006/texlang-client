import axios from "axios";

export const setHeaders = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('texlang-auth-token')}`
}