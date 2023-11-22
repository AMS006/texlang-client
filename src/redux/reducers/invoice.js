import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: false,
    invoices: [],
    selectedInvoice: undefined,
    selectedInvoiceWorks:[],
    selectedInvoiceTaxDetails:[]
};

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        invoiceRequest: (state) => {
            state.loading = true;
            state.error = false;
            state.selectedInvoice = undefined;
        },
        setInvoices: (state, action) => {
            state.invoices = action.payload;
            state.error = false;
            state.loading = false;
        },
        setGenerateInvoice:(state,action) =>{
            state.error = false;
            state.loading = false;
            state.selectedInvoice = action.payload;
            state.selectedInvoiceWorks = action.payload?.works || [];
            state.selectedInvoiceTaxDetails = action.payload?.taxDetails || [];
            const currInvoices = current(state.invoices)
            state.invoices = currInvoices.map((invoice) => {
                if(invoice.id === action.payload.projectId){
                    return {...invoice,invoiceNumber:action.payload.invoiceNumber,invoiceGenerated:true}
                }
                return invoice
            })
        },
        setInvoice: (state, action) => {
            state.error = false;
            state.selectedInvoice = action.payload;
            state.selectedInvoiceWorks = action.payload?.works || [];
            state.selectedInvoiceTaxDetails = action.payload?.taxDetails || [];
            state.loading = false;
        },
        setError: (state) => {
            state.error = true;
            state.loading = false;
            state.invoices = [];
            state.selectedInvoice = undefined;
        },
    },
});

export const {
    invoiceRequest,
    setInvoices,
    setInvoice,
    setGenerateInvoice,
    setError,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;