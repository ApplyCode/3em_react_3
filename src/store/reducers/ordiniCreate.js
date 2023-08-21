// third-party
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    operatori: []
};

export const ordiniReducer = createSlice({
    name: 'ordini',
    initialState,
    reducers: {
        addOperatore: (state, action) => {
            //state.push(action.payload)
            state.operatori = action.payload
        }
    }
})

export default ordiniReducer.reducer;

export const { addOperatore } = ordiniReducer.actions;
