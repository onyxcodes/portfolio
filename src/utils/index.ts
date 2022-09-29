import { isAsyncThunkAction } from '@reduxjs/toolkit';
import { store } from 'store';

const globalFunctions: {
    [key: string]: (...args: any[]) => void;
} = {
    test: (notificationId: string) => {
        console.log('Called test action for notification with id:',
            notificationId
        );
    },
    reattemptAction: (notificationId: string, {action}) => {
        if ( isAsyncThunkAction(action) ) {
            store.dispatch(action);
        }
    }
}

export { globalFunctions };