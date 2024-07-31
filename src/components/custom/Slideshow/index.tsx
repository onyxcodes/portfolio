import React from 'react';
import './index.scss';
import { ContentBlockType } from 'features/content';
import { getStrapiMedia } from 'utils/strapi';
import Link from 'components/commons/Link';
import { hex2rgba } from 'alenite-design'

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
const defaultSlideWrapper = ( slide: ContentBlockType ) => {
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
    let focusStyle;
    if (slide.focusBackground?.data?.[0]) {
        focusStyle = {
            backgroundImage: `url(${getStrapiMedia(slide.focusBackground?.data?.[0]).url})`
        };
    } else if (bgImageUrl) {
        focusStyle = {
            backgroundImage: `url(${bgImageUrl})`
        };
    } else {
        focusStyle = {
            backgroundColor: "transparent"
        };
    }

    // The caption is only visible if the captionVisible property is set to true
    // if not, it's visibile only on focus
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
    
    return <div  key={slide.id} className="slider" id={`slide-${slide.id}`}>
        <style>{ slideStyle }</style> 
        <figure className={figureClass} style={{margin: 0}}>
            <img className="fill" src={bgImageUrl} alt={""}/>
            {caption}
            {focusCaption}
        </figure>
    </div>
}

const Slideshow = ( props: SlideshowProps ) => {
    const { id, slides, slideSpacing, 
        slideWrapper =  defaultSlideWrapper,
        slideSize
    } = props;
    console.log("Init slideshow", { id, slides, slideSpacing });

    const renderInputCtrl = React.useCallback( ( i: number ) => {
        if ( i === 0 ) return <input key={i} type="radio" name={`slider-${id}`} className={`slide-radio${i}`}
        defaultChecked hidden id={`slider_${i}-${id}`}>
            </input>
        else return <input key={i} type="radio" name={`slider-${id}`} className={`slide-radio${i}`}
            hidden id={`slider_${i}-${id}`}>
            </input>
    }, [id]);

    let slideshowClass = 'slideshow';
    switch (slideSize) {
        case 'xl':
            slideshowClass = `${slideshowClass} slides-sizeXl`;
        break;
        case 'l':
            slideshowClass = `${slideshowClass} slides-sizeL`;
        break;
        case 'm':
            slideshowClass = `${slideshowClass} slides-sizeM`;
        break;
        case 's':
            slideshowClass = `${slideshowClass} slides-sizeS`;
        break;
        default:
            slideshowClass = `${slideshowClass} slides-sizeXl`;
    }

    const renderNavArrow = React.useCallback( ( i: number, type: 'next' | 'previous') => {
        let arrowEl = type === 'next' ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M298.3 256L131.1 81.9c-4.2-4.3-4.1-11.4.2-15.8l29.9-30.6c4.3-4.4 11.3-4.5 15.5-.2L380.9 248c2.2 2.2 3.2 5.2 3 8.1.1 3-.9 5.9-3 8.1L176.7 476.8c-4.2 4.3-11.2 4.2-15.5-.2L131.3 446c-4.3-4.4-4.4-11.5-.2-15.8L298.3 256z"></path>
        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M213.7 256L380.9 81.9c4.2-4.3 4.1-11.4-.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-.2L131.1 247.9c-2.2 2.2-3.2 5.2-3 8.1-.1 3 .9 5.9 3 8.1l204.2 212.7c4.2 4.3 11.2 4.2 15.5-.2l29.9-30.6c4.3-4.4 4.4-11.5.2-15.8L213.7 256z"></path>
        </svg> 
        return <label key={i} htmlFor={`slider_${i}-${id}`} className={`numb${i}`}> 
            { arrowEl }
        </label>
    }, [id]);

    const renderLabel = React.useCallback( ( i: number ) => 
        <label key={i} htmlFor={`slider_${i}-${id}`} className={`page${i}`}></label>
    , [id]);

    const renderElements = React.useCallback( () => {

        let labels: JSX.Element[] = [], 
            navArrowsPrevious: JSX.Element[] = [],
            navArrowsNext: JSX.Element[] = [],
            inputCtrls: JSX.Element[] = [];
            
        let slideList = slides.map( (slide, i) => {
            labels.push( renderLabel(i) );
            navArrowsPrevious.push( renderNavArrow(i, 'previous') );
            navArrowsNext.push( renderNavArrow(i, 'next') );
            inputCtrls.push( renderInputCtrl(i) );

            return slideWrapper(slide);
        });

        return {
            labels, inputCtrls,
            navArrowsNext, navArrowsPrevious,
            slideList
        }
    }, [slideWrapper, renderInputCtrl, renderLabel, renderNavArrow, slides]);

    const { labels, inputCtrls, navArrowsNext, navArrowsPrevious, slideList } = renderElements()

    const slideshowStyle = `
        #slideshow-${id} .slideshow-wrapper{
            grid-auto-flow: column;
            grid-column-gap: ${slideSpacing}px;
            grid-template-rows: calc(100% - 2.5px);
        }
        
        #slideshow-${id}.slides-sizeS .slideshow-wrapper {
            /* 3/4 = 0.75 */
            grid-auto-columns: calc(25% - ${ slideSpacing * 0.75 }px);
        }
        #slideshow-${id}.slides-sizeM .slideshow-wrapper {
            /* 2/3 = 0.667 */
            grid-auto-columns: calc(33.3% - ${ slideSpacing * 0.667 }px);
        }
        #slideshow-${id}.slides-sizeL .slideshow-wrapper {
            /* 1/2 = 0.5 => times: 0.5 = divided_by: 2 */
            grid-auto-columns: calc(50% - ${ slideSpacing * 0.5 }px);
        }
        #slideshow-${id}.slides-sizeXl .slideshow-wrapper {
            grid-auto-columns: 100%;
        }
        @media screen and (max-width: 840px) {
            #slideshow-${id}.slides-sizeS .slideshow-wrapper {
                /* 2/3 = 0.667 */
                grid-auto-columns: calc(33.3% - ${ slideSpacing * 0.667 }px);
            }
            #slideshow-${id}.slides-sizeM .slideshow-wrapper {
                grid-auto-columns: calc(50% - ${ slideSpacing * 2 }px);
            }
        }
        @media screen and (max-width: 600px) {
            #slideshow-${id}.slides-sizeS .slideshow-wrapper {
                grid-auto-columns: calc(50% - ${ slideSpacing * 2 }px);
            }
            #slideshow-${id}.slides-sizeM .slideshow-wrapper {
                grid-auto-columns: 100%;
            }
            #slideshow-${id}.slides-sizeL .slideshow-wrapper {
                grid-auto-columns: 100%;
            }
            #slideshow-${id} {
                padding: 0 !important;
            }
        }
        @media screen and (max-width: 408px) {
            #slideshow-${id}.slides-sizeS .slideshow-wrapper {
                grid-auto-columns: 100%;
            }
        }
        /* Slideshow pager arrow events */
        ${ [...Array(slides.length).keys()].map( i => {
            let next = ( i + 1 === slides.length ) ? 0 : i + 1;
            let previous = ( i - 1 < 0 ) ? slides.length - 1 : i - 1;
            return `
                #slideshow-${id} .slide-radio${i}:checked ~ .next .numb${next}, 
                #slideshow-${id} .slide-radio${i}:checked ~ .previous .numb${previous} {
                    display: block;
                    z-index: 1
                }
            `
        }).join('') }
        /* Slider Pager event */
        ${ [...Array(slides.length).keys()].map( i => {
            if ( i !== (slides.length-1) ) return `#slideshow-${id} .slide-radio${i}:checked ~ .slider-pagination .page${i},`
            else return `#slideshow-${id} .slide-radio${(slides.length-1)}:checked ~ .slider-pagination .page${(slides.length-1)} {
                background: rgba(255,255,255,1);
            }`
        }).join('') }
        /* Slide effect */
        ${ [...Array(slides.length).keys()].map( i => {
            let transformRule: string;
            if ( i === 0 ) {
                transformRule = `transform: translateX(0%);`
            } else if ( i === 1 ) {
                transformRule = `transform: translateX(calc(${ i * -100 }% - ${slideSpacing}px));`
            } else {
                transformRule = `transform: translateX(calc(${ i * -100 }% - ${i * slideSpacing}px));`
            }
            return `#slideshow-${id} .slide-radio${i}:checked ~ .slideshow-wrapper .slider { 
                ${transformRule}
            }`
        }).join('') }
        /* Styles caption background */
        #slideshow-${id} [class^='imghvr-'] figcaption:before,
        #slideshow-${id} [class*=' imghvr-'] figcaption:before {
            content:"";
            width:100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
    `

    return <div style={{width: "100%"}}>
        <style>{slideshowStyle}</style>
        
        <div id={`slideshow-${id}`} className={slideshowClass}>
            { inputCtrls }
            <div className="slider-pagination f jcc my05">
                <div className="wrapper px1 py025">
                    { labels }
                </div>
            </div>
            <div className="next control">
                { navArrowsNext }
            </div>
            <div className="previous control">
                { navArrowsPrevious }
            </div>
            <div className="slideshow-wrapper"> 
                { slideList }
            </div>
        </div>
    </div>
}

export default Slideshow;