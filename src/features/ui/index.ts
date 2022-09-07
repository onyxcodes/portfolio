import route from './route';
import { createReducer } from '@reduxjs/toolkit';

export interface UIState {
    path:string;
    isRouted: boolean;
}
const initalState = {
    path: "/",
    isRouted: false
} as UIState;

const reducer = createReducer(initalState, builder => {
    builder.addCase(route, (state, action) =>{
        state.path = action.payload.path;
        state.isRouted = true;
    })
})

export { route };
export default reducer;