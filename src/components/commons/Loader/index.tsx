import React from 'react';
import './index.scss';

/* TODO: make it a more stylish loader 
 * Consider localization meanwhile
*/

interface LoaderProps { 
    show: boolean;
    element?: JSX.Element;
    mask?: boolean;
    positionX?: 'start' | 'center' | 'end';
    positionY?: 'start' | 'center' | 'end';
} 

const DefaultElement = () => <div className='loader-default'>
    Loading
</div>

const Loader = ( props: LoaderProps ) => {
    const { 
        show = false,
        element = <DefaultElement/>,
        mask = true,
        positionX = 'center',
        positionY = 'center'
    } = props;
    const [ visible, setDelayedVisiblity ] = React.useState(false);

    React.useLayoutEffect( () => {
        let timeoutId: number;
        if ( show ) setDelayedVisiblity(show);
        else timeoutId = window.setTimeout( () => setDelayedVisiblity(show), 1000);
        return () => {
            timeoutId && window.clearTimeout(timeoutId);
        }
    }, [show]);

    let loaderClass = 'loader';

    if ( mask ) loaderClass = `${loaderClass} mask`;
    if ( show ) loaderClass = `${loaderClass} visible`;

    return (
        visible ? <div className={loaderClass}>
            {element}
        </div> : <></>
    );
}

export default Loader;