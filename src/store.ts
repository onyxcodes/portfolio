import { configureStore, nanoid, createListenerMiddleware, isRejected } from '@reduxjs/toolkit';
import ui, { UIState, notify } from 'features/ui';
import { NotificationType } from 'features/ui/types';
import content, { ContentState, getPage, fetchMenu, getArticle, listArticles, sendContactInquiry } from 'features/content';


export type AppDispatch = typeof store.dispatch;

// Create the middleware instance and methods
const failListenerMW = createListenerMiddleware();

// matcher that test if given action is a rejection originated
// by the specified creators
const isRejectedAction = isRejected( getPage, fetchMenu, getArticle, listArticles, sendContactInquiry );

failListenerMW.startListening({
	matcher: isRejectedAction,
	effect: async (action, listenerApi) => {
		const dispatch = listenerApi.dispatch;
		const actionType = action.type.replace('/rejected','');

		// Prepare and dispatch error notification
		let errNotification: NotificationType = {
			id: nanoid(),
			level: 'error',
			message: `Something went wrong while processing your request - (${actionType})`,
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