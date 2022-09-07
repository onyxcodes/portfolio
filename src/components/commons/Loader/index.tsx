import React from 'react';
import './index.scss';

/* TODO: make it a more stylish loader 
 * Consider localization meanwhile
*/

interface LoaderProps { 
    show: boolean;
    element?: JSX.Element;
} 

const DefaultElement = () => <div className='loader-default'>
    Loading
</div>

const Loader = ( props: LoaderProps ) => {
    const { 
        show = false,
        element = <DefaultElement/>
    } = props;

    return (
        show ? <div className='loader'>
            {element}
        </div> : <></>
    );
}

export default Loader;