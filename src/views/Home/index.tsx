import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpandingBlocks from 'components/ExpandingBlocks';
import { loadHome, ContentState, ContentBlockType } from 'features/content';
import { setTitle } from 'features/ui';
import { StoreState } from 'store';

import './index.scss';

interface HomeProps {
    //
}
const Home = ( props: HomeProps ) => {
    const dispatch = useDispatch();
    const loadHomeReq = useSelector<StoreState, ContentState['home']>( s => s.content.home );
    
    React.useEffect( () => {
        dispatch(loadHome(true));
        dispatch(setTitle('Portfolio'));
    }, [dispatch]);

    return(<div className='home'>
        <ExpandingBlocks blocks={loadHomeReq.featured}/>
    </div>)
}

export default Home;