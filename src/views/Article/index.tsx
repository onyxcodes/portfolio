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
import FileBlock from 'components/FileBlock';
import MediaTextBlock from 'components/MediaTextBlock';

interface ArticleProps {

}
const Article = () => {
    const dispatch = useDispatch();
    const { slug } = useParams();

    React.useEffect( () => {
        slug && dispatch(getArticle(slug))
    }, [slug]);

    const articleOp = useSelector<StoreState, ContentState['articleOp']>( s => s.content.articleOp );

    let content = articleOp.data?.attributes.content;
    let title = articleOp.data?.attributes.title;
    let cover = articleOp.data?.attributes.cover.data?.attributes;
    
    React.useEffect( () => {
        title && dispatch(setTitle(title));
    }, [title]);

    React.useEffect( () => {
        dispatch(setLoading(articleOp.loading));
    }, [articleOp.loading]);

    const renderedContent = React.useMemo( () => content?.map( (el, i) => {
        let component,
            cmpWrapperClass = 'article-content f py1';
        switch ( el.__component ) {
            case 'display.text-block':
                component = <TextBlock {...el}/>;
            break;
            case 'display.file-block':
                component = <FileBlock {...el} />
            break;
            case 'display.media-text-block':
                component = <MediaTextBlock {...el} />
            break;
            default: null;
        }
        return <div key={i} className={cmpWrapperClass}>{component}</div>
    }), [content])

    return articleOp.data ? <>
        <SubHeader cover={cover?.url} title={title!} />
        <div className='article f fd-col aic'>
        { renderedContent }
        </div>
    </> : ( !articleOp.loading && articleOp.success ? <NotFound /> : <></> )
}

export default Article;