import React from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from 'features/ui';
import './index.scss';
import TextBlock from 'components/commons/TextBlock';
import Link from 'components/commons/Link';

const Maintenance = () => {
    const dispatch = useDispatch();

    React.useEffect( () => {
        dispatch(setTitle('Maintenance'));
    }, []);

    return <div className='maintenance f jcc'>
        <div className='maintenance-wrapper col-9 col-lg-10 col-sm-12 p1'>
        <div className='maintenance-img r-18-9 lgr-4-5'
                style={{
                    backgroundImage: `url(${require('assets/maintenance.svg')})`
                }}
            >
            </div>
            <h1>This page is under construction</h1>
            <p>Check out the blog for updates</p>
            <Link to='/article'><h4>Articles</h4></Link>
            
        </div>
    </div>
}

export default Maintenance