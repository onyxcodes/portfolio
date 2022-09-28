import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UIState } from 'features/ui';
import { StoreState } from 'store';
import './index.scss';

import Alert from 'components/commons/Alert';

const NotificationArea = () => {
    const dispatch = useDispatch();
    const notifications = useSelector<StoreState, UIState['notifications']>( s => s.ui.notifications);

    return <div className='notification-area f fd-col aie'>
        <Alert
            message={`This is just a test with a very long message. For example here I write about Alice in Wonderland and how she could avoid getting lost if only she stayed put. I mean, I actually understand the desire to escape from a place where you don't feel at home. Even more the desire to go hunt for mushrooms and rabbits.
            Yet, I think it would have been better to stay at the party and live a boring life. Hope this text his long enough to stay at least in three lines`}
        />
        <Alert level='debug'
            message='This is just a test with a very small message'
        />
        <Alert level='warning'
            message='Careful to not leave bug araound!'
        />
        <Alert level='error'
            message='Oh snap! Something went wrong'
        />
        <Alert level='prompt'
            message='Are you ok with me stealing some of your data?'
        />
    </div>
}

export default NotificationArea