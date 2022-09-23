import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;
