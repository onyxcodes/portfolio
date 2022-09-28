import route from './route';
import setTitle from './title';
import setLoading from './loading';
import notify, { clearNotification, clearAllNotifications, loadNotifications } from './notify';
import { createReducer } from '@reduxjs/toolkit';
import { NotificationType } from './types';

export interface UIState {
    title: string;
    path:string;
    isRouted: boolean;
    loading: boolean;
    notifications: NotificationType[];
}
const initalState = {
    title: '...',
    path: "/",
    isRouted: false,
    loading: false,
    notifications: []
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

    // Notification management
    .addCase(notify, (state, action) => {
        state.notifications.push(action.payload)
    })
    .addCase(clearNotification, (state, action) => {
        let notificationIndex = state.notifications.findIndex( el => el.id === action.payload );
        state.notifications.splice(notificationIndex,1)
    })
    .addCase(clearAllNotifications, (state, action) => {
        state.notifications = initalState.notifications;
    })
    .addCase(loadNotifications, (state, action) => {
        state.notifications = [...state.notifications, ...action.payload ];
    })
})

export { route, setTitle, setLoading, clearNotification, notify, loadNotifications, clearAllNotifications };
export default reducer;