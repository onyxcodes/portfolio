import React from 'react';
import './index.scss';
import Icon from 'components/commons/Icon';
import Button from 'components/commons/Button';
import { NotificationType } from 'features/ui/types';

interface AlertProps extends NotificationType {
    onClose?: () => void;
    showIcon?: boolean;
    showElapsedTime?: boolean;
    buttons?: JSX.Element[];
    closeOnAction?: boolean;
}
const Alert = ( props: AlertProps ) => {
    const {
        id,
        level = 'info',
        message, actions,
        clearable = true,
        timeout,
        timestamp,
        showIcon = true,
        showElapsedTime = false,
        buttons,
        closeOnAction = true,
        onClose,
    } = props;
    
    const [ visible, setVisible ] = React.useState(true);
    const [ mounted, mount ] = React.useState(false);
    const [ visibility, setVisibility ] = React.useState(false);

    let alertClass = `alert alert-${level}`;

    React.useLayoutEffect( () => {
        let unmountTimeoutId: number,
            visiblityTimeoutId: number;
        if ( visible ) {
            mount(visible);
            visiblityTimeoutId = window.setTimeout( () => setVisibility(true), 150)
        } else {
            unmountTimeoutId = window.setTimeout( () => mount(visible), 1000);
            setVisibility(visible);
        }
    }, [visible]);

    if ( visibility ) {
        alertClass = `${alertClass} visible`;
    }

    let alertIcon;
    if ( showIcon ) {
        let iconName;
        switch (level) {
            case 'info':
                iconName = 'info-circle';
            break;
            case 'warning':
                iconName = 'exclamation-triangle';
            break;
            case 'debug':
                iconName = 'lightbulb-o';
            break;
            case 'error':
                iconName = 'frown-o';
            break;
            case 'prompt':
                iconName = 'question-circle'
            break;
        }
        alertIcon = <div className='alert-icon f aic p05'>
            <Icon name={iconName} />
        </div>
    }

    const renderedButtons = React.useMemo( () => buttons?.map( (button, i) => {
        const extendedOnClick = () => {
            button.props.onClick && button.props.onClick;
            if ( closeOnAction ) setVisible(false);
        }
        return <button.type key={button.key || i} 
            {...button.props}
            onClick={() => extendedOnClick()}
        />
    }), [buttons])

    /* Trace unmount of component to trigger, if provided,
     * fire onClose callback
     */
    React.useEffect( () => {
        if (!mounted && !visible) {
            onClose && onClose();
        }
    }, [mounted]);

    return mounted ? <>
        <div className={alertClass}>
            { clearable && <Button onClick={() => setVisible(false)} className='f-right m025' 
                iconName='close' shape='circle' type='text'
            /> }
            <div className='alert-wrapper f fd-row p05'>
                { alertIcon }
                <div className='alert-content f aic t6 px05'>
                    <span>{message}</span>
                    { renderedButtons?.length && <div className='alert-buttons px05 f jcc'>
                        {renderedButtons}
                    </div>}
                </div>
            </div>
        </div>
    </> : <></>
}

export default Alert;