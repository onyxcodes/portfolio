import React from 'react';
import Slideshow from 'components/Slideshow';
import { ContentBlockType } from 'features/content';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import TextBlock from 'components/commons/TextBlock';
import { getPage, ContentState } from 'features/content';
import { setLoading, setTitle } from 'features/ui';
import { StoreState } from 'store';
import NotFound from 'views/NotFound';

import './index.scss';
import FileBlock from 'components/FileBlock';

const exampleSlideshow: {
    id: number;
    __component: "display.slideshow",
    size: string; // specify more
    slideSize: string; // specify more
    slideSpacing: number,
    showNavigation: true;
    slide: ContentBlockType[]
} = {
    "id": 1,
    "__component": "display.slideshow",
    "size": "m",
    "slideSize": "xl",
    "slideSpacing": 50,
    "showNavigation": true,
    "slide": [
        {
            "id": 9,
            "bgColor": "#999",
            "focusBgColor": null,
            "captionTitle": "Building with Strapi is fun",
            "captionColor": "#fff",
            "caption": "I will fill this with some lorem ipsum later",
            "captionTextAlignment": "left",
            "captionVisible": false,
            "captionPositionX": "center",
            "captionPositionY": "center",
            "captionBgColor": "#000",
            "captionBgAlpha": 100,
            "focusAnimation": "fade",
            "link": null,
            "linkText": "More",
            "linkTarget": "_self",
            "background": {
                "data": [
                    {
                        "id": 13,
                        "attributes": {
                            "name": "building_a_blog_with_strapi_cover_25e7c1ad11.svg",
                            "alternativeText": "building_a_blog_with_strapi_cover_25e7c1ad11.svg",
                            "caption": "building_a_blog_with_strapi_cover_25e7c1ad11.svg",
                            "width": 1200,
                            "height": 800,
                            "formats": null,
                            "hash": "building_a_blog_with_strapi_cover_25e7c1ad11_2ab3fef52a",
                            "ext": ".svg",
                            "mime": "image/svg+xml",
                            "size": 227.39,
                            "url": "/uploads/building_a_blog_with_strapi_cover_25e7c1ad11_2ab3fef52a.svg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2022-09-19T18:11:25.325Z",
                            "updatedAt": "2022-09-19T18:11:25.325Z"
                        }
                    }
                ]
            },
            "focusBackground": {
                "data": [
                    {
                        "id": 11,
                        "attributes": {
                            "name": "artboard_1_4e70ae54ad.svg",
                            "alternativeText": "artboard_1_4e70ae54ad.svg",
                            "caption": "artboard_1_4e70ae54ad.svg",
                            "width": 1200,
                            "height": 800,
                            "formats": null,
                            "hash": "artboard_1_4e70ae54ad_275d879da8",
                            "ext": ".svg",
                            "mime": "image/svg+xml",
                            "size": 49.8,
                            "url": "/uploads/artboard_1_4e70ae54ad_275d879da8.svg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2022-09-19T18:11:24.306Z",
                            "updatedAt": "2022-09-19T18:11:24.306Z"
                        }
                    }
                ]
            }
        },
        {
            "id": 10,
            "bgColor": "#999",
            "focusBgColor": null,
            "captionTitle": "Another one",
            "captionColor": "#fff",
            "caption": "Just cheap thrills here! Cmon try to fill this caption to the brink.. Even if I can't come up with anything.. should be enough",
            "captionTextAlignment": "left",
            "captionVisible": false,
            "captionPositionX": "center",
            "captionPositionY": "center",
            "captionBgColor": "#000",
            "captionBgAlpha": 100,
            "focusAnimation": "fade",
            "link": null,
            "linkText": "More",
            "linkTarget": "_self",
            "background": {
                "data": [
                    {
                        "id": 16,
                        "attributes": {
                            "name": "artboard_3_4814564b37.svg",
                            "alternativeText": "artboard_3_4814564b37.svg",
                            "caption": "artboard_3_4814564b37.svg",
                            "width": 1200,
                            "height": 800,
                            "formats": null,
                            "hash": "artboard_3_4814564b37_91a34f2809",
                            "ext": ".svg",
                            "mime": "image/svg+xml",
                            "size": 302.43,
                            "url": "/uploads/artboard_3_4814564b37_91a34f2809.svg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2022-09-19T18:11:25.685Z",
                            "updatedAt": "2022-09-19T18:11:25.685Z"
                        }
                    }
                ]
            },
            "focusBackground": {
                "data": null
            }
        }
    ]
}

interface PageProps {
    //
}
const Page = ( props: PageProps ) => {
    const dispatch = useDispatch();
    const { slug } = useParams();

    React.useEffect( () => {
        slug && dispatch(getPage(slug))
    }, [slug]);

    const pageOp = useSelector<StoreState, ContentState['pageOp']>( s => s.content.pageOp );

    let title = pageOp.data?.attributes.title;
    let content = pageOp.data?.attributes.content;

    React.useEffect( () => {
        title && dispatch(setTitle(title));
    }, [title]);

     React.useEffect( () => {
        dispatch(setLoading(pageOp.loading));
    }, [pageOp.loading]);

    const renderContents = React.useCallback( () => content?.map( (el, i) => {
        let component,
            cmpWrapperClass = 'page-content f py1';
        switch ( el.__component ) {
            case 'display.text-block':
                component = <TextBlock {...el}/>;
            break;
            case 'display.file-block':
                // cmpWrapperClass = `${cmpWrapperClass} col-9 col-lg-10 col-sm-12`;
                component = <FileBlock {...el} />
            break;
            default: null;
        }
        return <div key={i} className={cmpWrapperClass}>{component}</div>
    }), [content])

    return pageOp.data ? <div className='page f fd-col aic'>
        {/* <Slideshow id={1} slides={exampleSlideshow.slide} slideSpacing={exampleSlideshow.slideSpacing}  /> */}
        { renderContents() }
    </div> : ( !pageOp.loading ? <NotFound/> : <></>)
}

export default Page;