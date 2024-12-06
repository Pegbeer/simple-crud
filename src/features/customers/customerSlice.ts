import { Result, Status } from '@/lib/utils';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface Customer {
    id: number,
    name: string,
    isMype: boolean
}

export interface CustomersState{
    customers:Customer[];
    status:Status;
    error:string|null;
}

const initialState:CustomersState = {
    customers: [],
    status: Status.IDLE,
    error: null
}

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
    const response = await fetch('/api/customers');
    if(!response.ok){
        throw new Error('Error al obtener la lista de clientes');
    }
    const data = await response.json();
    console.log(data);
    return data as Customer[];
});

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(fetchCustomers.fulfilled,(state,action:PayloadAction<Customer[]>) =>{
                state.status = Status.SUCCESS
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected,(state,action) =>{
                state.status = Status.ERROR;
                state.error = action.error.message || 'Error al procesar la acción';
            })
    }
});

export default customersSlice.reducer;