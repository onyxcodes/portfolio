import { isAsyncThunkAction, AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import { store } from 'store';
import { getPage, fetchMenu, getArticle, listArticles, sendContactInquiry } from 'features/content';

/**
 * @description: Given an action, it get tested against a set of possibile action creators
 * If found, return the original creator for that action
 */
const getActionCreator = ( action: AnyAction, creators: AsyncThunk<any, any, {}>[] ) => {
	for ( const creator of creators ) {
		const isCurrentAction = isAsyncThunkAction(creator);
		if ( isCurrentAction(action)) {
            // TODO: also log to pino found creator?
			// console.log('found action',creator.typePrefix)
			return creator;
		}
	}
}

const globalFunctions: {
    [key: string]: (...args: any[]) => void;
} = {
    test: (notificationId: string) => {
        console.log('Called test action for notification with id:',
            notificationId
        );
    },
    reattemptAction: (notificationId: string, {action}) => {
        const actionCreator = getActionCreator(action, [getPage, fetchMenu, getArticle, listArticles, sendContactInquiry]);
        if ( isAsyncThunkAction(action) && actionCreator ) {
            store.dispatch(actionCreator(action.meta.arg));
        }
    }
}

export { globalFunctions };