import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from 'components/commons/List';
import { ContentState, listArticles } from 'features/content';
import { StoreState } from 'store';
import './index.scss';
import ActionBar from 'components/commons/ActionBar';
import { setLoading, setTitle } from 'features/ui';

interface ArticleListProps {
    //
}
const ArticleList = ( props: ArticleListProps ) => {
    const dispatch = useDispatch();
    const [ page, setPage ] = React.useState(1);
    const [ pageSize, setPageSize ] = React.useState(25);

    const listArticlesOp = useSelector<StoreState, ContentState['articlesOp']>( s => s.content.articlesOp );

    React.useEffect( () => {
        dispatch(setTitle('Articles'));
    }, [dispatch])

    React.useEffect( () => {
        dispatch(listArticles({
            page: page,
            pageSize: pageSize
        }))
    }, [page, pageSize]);

    React.useEffect( () => {
        dispatch(setLoading(listArticlesOp.loading));
    }, [listArticlesOp.loading]);

    return(<div className='article-list f fd-col aic'>
        <List parent='/article' data={listArticlesOp.data} />
        <ActionBar position="bottom"
            items={[
                { item: <button onClick={() => console.log('prev page')} disabled={true}>Previous</button>, position: "left"},
                { item: <button onClick={() => console.log('next page')} disabled={true}>Next</button>, position: "right"}
            ]}
        />
    </div>)
}

export default ArticleList