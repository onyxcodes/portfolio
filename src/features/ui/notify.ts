import { createAction } from '@reduxjs/toolkit';
import { NotificationType } from './types';

const notify = createAction<NotificationType>('notify');

const clearNotification = createAction<string>('clearNotification');

const clearAllNotifications = createAction('clearAllNotifications');

/* May be useful when notifications are saved in a database
 * and want to restore them at app load
 */
const loadNotifications = createAction<NotificationType[]>('loadNotifications');

export { clearNotification, clearAllNotifications, loadNotifications };
export default notify;