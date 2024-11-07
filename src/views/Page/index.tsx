import React from 'react';
import Slideshow from 'components/custom/Slideshow';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import TextBlock from 'components/custom/TextBlock';
import { getPage, ContentState } from 'features/content';
import { setLoading, setTitle } from 'features/ui';
import { StoreState } from 'store';
import NotFound from 'views/NotFound';

import './index.scss';
import FileBlock from 'components/custom/FileBlock';
import ExpandingBlocks from 'components/custom/ExpandingBlocks';
import useSnapScroll from 'hooks/useSnapScroll';
import MediaTextBlock from 'components/custom/MediaTextBlock';
import FormBlock from 'components/custom/FormBlock';
import { useAppDispatch } from 'hooks/index';

interface PageProps {
    forcedSlug?: string;
}
const Page = ( props: PageProps ) => {
    const { forcedSlug } = props;
    const dispatch = useAppDispatch();
    const { slug } = useParams();
    const pageRef = React.useRef<HTMLDivElement | null>(null);
    
    // Loads a specific page instead of parsing param
    const _slug = forcedSlug || slug;
    React.useEffect( () => {
        _slug && dispatch(getPage(_slug))
    }, [dispatch, _slug]);

    const pageOp = useSelector<StoreState, ContentState['pageOp']>( s => s.content.pageOp );

    let title = pageOp.data?.attributes.title;
    let content = pageOp.data?.attributes.content;
    let isFullScreen = pageOp.data?.attributes.fullScreenContent;

    React.useEffect( () => {
        title && dispatch(setTitle(title));
    }, [dispatch, title]);

     React.useEffect( () => {
        dispatch(setLoading(pageOp.loading));
    }, [dispatch, pageOp.loading]);

    // Enable snap scrolling only when full screen is enabled
    useSnapScroll( isFullScreen ? pageRef.current : null);

    const renderedContent = React.useMemo( () => content?.map( (el, i) => {
        let component,
            cmpWrapperClass = 'page-content f',
            cmpWrapperStyle;

        // If fullscreen mode not enabled add vertical padding
        if (!isFullScreen) cmpWrapperClass = `${cmpWrapperClass} py1`;
        else cmpWrapperStyle = {
            // Translate content in full screen mode
            transform: `translateY(calc(100% * ${i}))`
        }

        switch ( el.__component ) {
            case 'display.text-block':
                component = <TextBlock {...el}/>;
            break;
            case 'display.file-block':
                component = <FileBlock {...el} />
            break;
            case 'display.expanding-columns':
                component = <ExpandingBlocks {...el} />
            break;
            case 'display.media-text-block':
                component = <MediaTextBlock {...el} />
            break;
            case 'input.form-block':
                component = <FormBlock {...el} />
            break;
            case 'display.slideshow':
                component = <Slideshow {...el} />;
                break;
            default: 
                console.log('Unknown component', el.__component);
                return <></>;
        }
        return <div key={i} className={cmpWrapperClass}
            style={cmpWrapperStyle}
        >{component}</div>
    }), [content, isFullScreen]);

    let pageClass = 'page f fd-col aic';
    if (isFullScreen) pageClass = `${pageClass} fullpage`;

    return pageOp.data ? <div className={pageClass} ref={pageRef}>
        { renderedContent }
    </div> : ( !pageOp.loading && pageOp.success ? <NotFound/> : <></>)
}

export default Page;