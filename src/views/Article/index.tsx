import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SubHeader from 'components/commons/SubHeader';
import TextBlock from 'components/commons/TextBlock';
import { getArticle, ContentState } from 'features/content';
import { setLoading, setTitle } from 'features/ui';
import { StoreState } from 'store';
import './index.scss';
import NotFound from 'views/NotFound';

interface ArticleProps {

}
const Article = () => {
    const dispatch = useDispatch();
    const { slug } = useParams();

    React.useEffect( () => {
        slug && dispatch(getArticle(slug))
    }, [slug]);

    const articleOp = useSelector<StoreState, ContentState['articleOp']>( s => s.content.articleOp );

    let text = articleOp.data?.attributes.content;
    let title = articleOp.data?.attributes.title;
    let cover = articleOp.data?.attributes.cover.data?.attributes;
    
    React.useEffect( () => {
        title && dispatch(setTitle(title));
    }, [title]);

    React.useEffect( () => {
        dispatch(setLoading(articleOp.loading));
    }, [articleOp.loading]);

    return articleOp.data ? <>
        <SubHeader cover={cover?.url} title={title!} />
        <div className='article f jcc'>
            <div className='article-content col-9 col-lg-10 col-sm-12'>
                {text && <TextBlock text={text}/>}
            </div>
        </div>
    </> : ( !articleOp.loading ? <NotFound /> : <></> )
}

export default Article;