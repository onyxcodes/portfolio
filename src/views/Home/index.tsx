import React from 'react';
import { useSelector } from 'react-redux';
import ExpandingBlocks from 'components/custom/ExpandingBlocks';
import { loadHome, ContentState, ContentBlockType } from 'features/content';
import { setTitle } from 'features/ui';
import { StoreState } from 'store';
import { useAppDispatch } from 'hooks/index';

import './index.scss';

interface HomeProps {
    //
}
const Home = ( props: HomeProps ) => {
    const dispatch = useAppDispatch();
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