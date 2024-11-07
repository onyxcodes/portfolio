import React from 'react';
import './index.scss';
import { ContentBlockType } from 'features/content';
import { getStrapiMedia } from 'utils/strapi';
import Link from 'components/commons/Link';
import { hex2rgba, Slider } from 'alenite-design'

import "alenite-design/lib/styles/Slider.css";

interface SlideshowProps {
    id: number;
    slides: ContentBlockType[];
    slideSpacing: number;
    slideWrapper?: (slide: ContentBlockType) => JSX.Element;
    slideSize: 'xl' | 'l' | 'm' | 's';
}
interface CaptionProps {
    className?: string;
    caption: string;
    captionTitle: string;
    captionPositionY: 'start' | 'center' | 'end';
    captionPositionX: 'start' | 'center' | 'end';
    captionBgColor: string;
    captionColor: string;
    captionBgAlpha: number;
    captionTextAlignment: 'left' | 'center' | 'right';
    link: string | null;
    linkTarget?: "_self" | "_blank";
    linkText?: string;
}
const Caption = ( props: CaptionProps ) => {
    const { 
        caption, className, captionTitle, captionPositionY, captionPositionX, 
        captionBgColor, captionColor, captionBgAlpha, captionTextAlignment, 
        link, linkTarget, linkText 
    } = props;

    let captionContainerClass = className;

    return <div className={captionContainerClass} style={{
        flexWrap: "wrap",
        textAlign: captionTextAlignment,
        justifyContent: captionPositionX,
        alignContent: captionPositionY
    }}>
        <div className="caption" style={{
            color: captionColor,
            background: hex2rgba(captionBgColor, captionBgAlpha/100),
        }}>
            {captionTitle  ? <h3>{captionTitle}</h3> : <></>}
            {caption ? <p>{caption}</p> : <></>}
            {link ? <Link to={link} target={linkTarget}>
                    <span className='h6'>{linkText}</span>
                </Link> : <></>}
        </div>
    </div>
}

const wrapper = ( slide: ContentBlockType ) => {
    let slideStyle = `
        #slide-${slide.id} [class^='imghvr-'] figcaption:before,
        #slide-${slide.id} [class*=' imghvr-'] figcaption:before {
            background-color: transparent;
        }
        #slide-${slide.id} [class^='imghvr-'],
        #slide-${slide.id} [class*=' imghvr-'],
        #slide-${slide.id} [class*=' imghvr-']:after,
        #slide-${slide.id} [class*=' imghvr-']:before {
            background-color: transparent !important;
        }
    `;
    let captionContainerClass = `z2 fill p-absolute p1 f fd-col`;

    let bgImageUrl = slide.background?.data?.[0] ? getStrapiMedia(slide.background.data[0]).url
    : undefined;

    let figureClass = `fill`;
    let caption,
        focusCaption;
    if (slide.captionVisible) {
       caption = <Caption className={captionContainerClass}
            caption={slide.caption}
            captionTitle={slide.captionTitle}
            captionPositionY={slide.captionPositionY}
            captionPositionX={slide.captionPositionX}
            captionBgColor={slide.captionBgColor}
            captionColor={slide.captionColor}
            captionBgAlpha={slide.captionBgAlpha}
            captionTextAlignment={slide.captionTextAlignment}
            link={slide.link}
            linkTarget={slide.linkTarget}
            linkText={slide.linkText}
        />
    } else {
        caption = <></>
    }
    
    if (slide.focusBackground?.data?.[0]) {
        let focusStyle = {
            backgroundImage: `url(${getStrapiMedia(slide.focusBackground?.data?.[0]).url})`
        };
        // Show caption inside focus only if it's not visibile by default
        focusCaption = <figcaption style={focusStyle}>
            {!slide.captionVisible ? <Caption className={captionContainerClass}
                caption={slide.caption}
                captionTitle={slide.captionTitle}
                captionPositionY={slide.captionPositionY}
                captionPositionX={slide.captionPositionX}
                captionBgColor={slide.captionBgColor}
                captionColor={slide.captionColor}
                captionBgAlpha={slide.captionBgAlpha}
                captionTextAlignment={slide.captionTextAlignment}
                link={slide.link}
                linkTarget={slide.linkTarget}
                linkText={slide.linkText} /> 
            : <></>}
        </figcaption>

        switch ( slide.focusAnimation ) {
            case 'shutter':
                figureClass = `${figureClass} imghvr-shutter-in-out-diag-1`;
            break;
            case 'fade':
                figureClass = `${figureClass} imghvr-fade`;
            break;
            case 'fold':
                figureClass = `${figureClass} imghvr-fold-down`;
            break;
            case 'zoom-out':
                figureClass = `${figureClass} imghvr-zoom-out-flip-horiz`;
            break;
        }
    }
    
    return <>
        <style>{ slideStyle }</style> 
        <figure className={figureClass} style={{margin: 0}}>
            <img className="fill" src={bgImageUrl} alt={""}/>
            {caption}
            {focusCaption}
        </figure>
    </>
}

const Slideshow = ( props: SlideshowProps ) => {
    const { id, slides, slideSpacing, 
        slideSize
    } = props;

    return <Slider slides={slides} slideWrapper={wrapper} id={id} spacing={slideSpacing} size={slideSize} />
}

export default Slideshow;