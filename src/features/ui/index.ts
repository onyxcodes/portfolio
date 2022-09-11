import route from './route';
import setTitle from './title';
import setLoading from './loading';
import { createReducer } from '@reduxjs/toolkit';

export interface UIState {
    title: string;
    path:string;
    isRouted: boolean;
    loading: boolean
}
const initalState = {
    title: 'Onyx Ganda - Portfolio',
    path: "/",
    isRouted: false,
    loading: false
} as UIState;

const reducer = createReducer(initalState, builder => { builder
    .addCase(route, (state, action) =>{
        state.path = action.payload.path;
        state.isRouted = true;
    })
    .addCase(setTitle, (state, action) => {
        state.title = action.payload;
    })
    .addCase(setLoading, (state, action) => {
        state.loading = action.payload;
    })
})

export { route, setTitle, setLoading };
export default reducer;