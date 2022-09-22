import React from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from 'features/ui';
import './index.scss';
import TextBlock from 'components/commons/TextBlock';
import Link from 'components/commons/Link';

const NotFound = () => {
    const dispatch = useDispatch();

    React.useEffect( () => {
        dispatch(setTitle('Page not found'));
    }, []);

    return <div className='notfound f jcc'>
        <div className='notfound-wrapper col-9 col-lg-10 col-sm-12 p1'>
        <div className='notfound-img r-18-9 lgr-4-5'
                style={{
                    backgroundImage: `url(${require('assets/notfound-animated.svg')})`
                }}
            >
            </div>
            <h1>404 - You are not supposed to be here</h1>
            
            <Link to='/'><h4>Back home</h4></Link>
            
        </div>
    </div>
}

export default NotFound