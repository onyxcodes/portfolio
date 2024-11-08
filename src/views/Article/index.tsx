import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'hooks/index';
import { useParams } from 'react-router-dom';
import SubHeader from 'components/commons/SubHeader';
import TextBlock from 'components/custom/TextBlock';
import { getArticle, ContentState } from 'features/content';
import { setLoading, setTitle } from 'features/ui';
import { StoreState } from 'store';
import './index.scss';
import NotFound from 'views/NotFound';
import FileBlock from 'components/custom/FileBlock';
import MediaTextBlock from 'components/custom/MediaTextBlock';

import { DiscussionEmbed } from 'disqus-react';

interface ArticleProps {

}
const Article = () => {
    const dispatch = useAppDispatch();
    const { slug } = useParams();

    React.useEffect( () => {
        slug && dispatch(getArticle(slug))
    }, [dispatch, slug]);

    const articleOp = useSelector<StoreState, ContentState['articleOp']>( s => s.content.articleOp );

    // Retrieve from env abilitation and config for Disqus
    const discussionEnabled = process.env.DISQUS_ENABLED;
    const discussionShortname = process.env.DISQUS_SHORTNAME;

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
            default: console.log('Unknown component', el.__component);
        }
        return <div key={i} className={cmpWrapperClass}>{component}</div>
    }), [content]);

    // Disqus
    const discussion = React.useMemo( () => <div className='article-discussion m05'><DiscussionEmbed
        shortname={discussionShortname!}
        config={
            {
                url: `${window.location.origin}/${window.location.pathname}`,
                identifier: slug,
                title: title,
            }
        }
    /></div>, [articleOp]);

    return articleOp.data ? <>
        <SubHeader cover={cover?.url} title={title!} />
        <div className='article f fd-col aic'>
        { renderedContent }
        </div>
        { discussionEnabled !== 'false' && discussion }
    </> : ( !articleOp.loading && articleOp.success ? <NotFound /> : <></> )
}

export default Article;