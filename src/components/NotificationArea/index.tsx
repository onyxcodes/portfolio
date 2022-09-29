import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UIState } from 'features/ui';
import { StoreState } from 'store';
import './index.scss';

import Alert from 'components/commons/Alert';
import Button from 'components/commons/Button';

import { clearNotification } from 'features/ui';
import { globalFunctions } from 'utils/';

const NotificationArea = () => {
    const dispatch = useDispatch();
    const notifications = useSelector<StoreState, UIState['notifications']>( s => s.ui.notifications);

    const closeNotification = React.useCallback( (id?: string) => {
        id && dispatch(clearNotification(id))
    }, [dispatch]);

    const renderedNotifications = React.useMemo( () => notifications.map( (notification, i) => {
        let buttons = notification.actions?.map( (action, i) => {
            /* Redux doesn't like non-serializable data, therefore,
             * to specify a function to call I'll use a mapping. 
             * TODO: Consider passing the whole notification to the global methods
             * instead of only the id
             */
            const buttonAction = () => {
                globalFunctions[action.globalFnName] && globalFunctions[action.globalFnName](notification.id, action.payload);
            }
            return <Button key={i}
                onClick={() => buttonAction()}
            >
                {action.label}
            </Button>
        });
        return <Alert key={notification.id}
            message={notification.message}
            level={notification.level}
            clearable={notification.clearable}
            timeout={notification.timeout}
            timestamp={notification.timestamp}
            showElapsedTime={!!!notification.timestamp}
            buttons={buttons}
            onClose={() => closeNotification(notification.id)}
        />
    }), [notifications]);

    return renderedNotifications.length ? 
        <div className='notification-area f fd-col aie'>
        {renderedNotifications}
        </div> : <></>
}

export default NotificationArea;