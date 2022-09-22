import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpandingBlocks, { ColumnProps } from 'components/commons/ExpandingBlocks';
import { loadHome, ContentState, BlockType } from 'features/content';
import { setTitle } from 'features/ui';
import { StoreState } from 'store';

import './index.scss';

interface HomeProps {
    //
}
const Home = ( props: HomeProps ) => {
    const dispatch = useDispatch();
    const loadHomeReq = useSelector<StoreState, ContentState['home']>( s => s.content.home );
    const [ featuredBlocks, setFeaturedBlocks ] = React.useState<ColumnProps[]>([]);
    
    React.useEffect( () => {
        dispatch(loadHome(true));
        dispatch(setTitle('Portfolio'));
    }, [dispatch]);

    const processBlocks = ( blocks: BlockType[] ) => blocks.map( block => {
        let blockConf: ColumnProps = {
            ...block,
            key: `${block.id}`,
            background: block.background.data.map( background => {
                return {
                    url: `${process.env.API_ENDPOINT}${background.attributes.url}`,
                    type: ['image/jpeg','image/svg+xml'].includes(background.attributes.mime) ? 'image' : 'video',
                    alt: background.attributes.alternativeText
                }
            })
        };
        return blockConf
    })

    React.useEffect( () => {
        if (loadHomeReq.featured) setFeaturedBlocks(processBlocks(loadHomeReq.featured))
    }, [loadHomeReq.featured])

    return(<div className='home'>
        <ExpandingBlocks blocks={featuredBlocks}/>
    </div>)
}

export default Home;