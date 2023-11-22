import axios from "axios"
import { setHeaders } from "../../../helper"
import { invoiceRequest, setError, setGenerateInvoice, setInvoice, setInvoices } from "../../reducers/invoice"
import { clearUser } from "../../reducers/user"

export const getInvoices = () => async(dispatch) =>{
    try {
        dispatch(invoiceRequest())
        setHeaders()
        const invoices = await axios({
            method:"GET",
            url:`${import.meta.env.VITE_API_URL}/api/admin/invoice/all`,
        })
        dispatch(setInvoices(invoices.data.projects))
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(setError())
    }
}

export const generateProjectInvoice = (projectId) => async(dispatch) =>{
    try {
        setHeaders();
        dispatch(invoiceRequest())
        const res = await axios({
            method:"POST",
            url:`${import.meta.env.VITE_API_URL}/api/admin/invoice/project/generate/`,
            data:{
                projectId
            }
        })
        const invoiceData = res.data.invoice
        dispatch(setGenerateInvoice(invoiceData))
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(setError())
    }
}

export const getProjectInvoiceDetails = (invoiceId) => async(dispatch) =>{
    try {
        setHeaders();
        dispatch(invoiceRequest())
        const res = await axios({
            method:"GET",
            url:`${import.meta.env.VITE_API_URL}/api/admin/invoice/project/details/${invoiceId}`,
        })
        const invoiceData = res.data.invoice
        dispatch(setInvoice(invoiceData))
    } catch (error) {
        const statusCode = error?.response?.status
        if(statusCode === 401){
            localStorage.removeItem("texlang-auth-token")
            dispatch(clearUser())
        }
        dispatch(setError())
    }
}