import { configureStore, createListenerMiddleware, isRejected } from '@reduxjs/toolkit';
import ui, { UIState, notify } from 'features/ui';
import { NotificationType } from 'features/ui/types';
import content, { ContentState, getPage, fetchMenu, getArticle, listArticles } from 'features/content';

// Create the middleware instance and methods
const failListenerMW = createListenerMiddleware();

const isARejectedAction = isRejected( getPage, fetchMenu, getArticle, listArticles );

failListenerMW.startListening({
	matcher: isARejectedAction,
	effect: async (action, listenerApi) => {
		const dispatch = listenerApi.dispatch;

		// Prepare and dispatch error notification
		let errNotification: NotificationType = {
			id: action.meta.requestId,
			level: 'error',
			message: `Something went wrong while processing your request - (${action.type.replace('/rejected','')})`,
			clearable: true,
			timestamp: new Date().getTime(),
			actions: [{
				label: 'Try again',
				globalFnName: 'reattemptAction',
				payload: {
					action
				}
			}]
		}
		dispatch(notify(errNotification));

		// TODO: log error with pino's logger
	}
});

export type StoreState = {
		ui: UIState;
		content: ContentState
}

export const store = configureStore({
	reducer: {
		ui,
		content
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
		.prepend(failListenerMW.middleware)
});