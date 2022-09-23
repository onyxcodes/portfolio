import React from 'react';
import Link from 'components/commons/Link';
import './index.scss';

import { hex2rgba } from 'utils/colors';
import useTouchSelection from 'components/commons/useTouchSelection';
import { ContentBlockType } from 'features/content';
import { getStrapiMedia } from 'utils/strapi';

interface ExpandingBlocksProps {
    blocks: ContentBlockType[]
}

const Block = ( props: ContentBlockType ) => {
    const { background, caption, captionTitle, captionPositionY, captionPositionX, bgColor = '#999',
    captionBgColor, captionColor, captionBgAlpha,
    captionTextAlignment,
    link, linkTarget, linkText
} = props;

    const [ activeBackground, setBackground ] = React.useState({
        index: 0,
        ...getStrapiMedia(background.data[0])
    });

    React.useEffect( () => {
        let timeoutId: number;
        if ( background.data.length > 1 ) {
            let i = (activeBackground.index+1 < background.data.length) ? activeBackground.index+1 : 0;

            timeoutId = window.setTimeout( () => setBackground({
                index: i,
                ...getStrapiMedia(background.data[i])
            }), 5000)
        }
        return () => {
            // cleanup
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [background, activeBackground]);

    const style = {
        backgroundolor: bgColor,
        backgroundImage: activeBackground.type?.startsWith('image') ? `url('${activeBackground.url}')` : undefined,
        alignItems: captionPositionY,
        justifyContent: captionPositionX,
    };

    const contentStyle = {
        backgroundColor: hex2rgba(captionBgColor, captionBgAlpha/100),
        color: captionColor,
        textAlign: captionTextAlignment
    }

    const { TouchSelector, touchHandler } = useTouchSelection('block-selector', 'expanding-blocks'); 

    return(
        <>
            <TouchSelector />

            <div className="column" 
                style={style} onClick={() => touchHandler()}
            >
                { activeBackground.type?.startsWith('video') && 
                    <video className='block-bgvideo' playsInline autoPlay muted loop>
                    <source src={activeBackground.url} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video> }

                <span role="img" aria-label={activeBackground.alt}></span>

                <div className="expand-column-content"
                    style={contentStyle}
                >
                    <h2>{captionTitle}</h2>
                    <p>{caption}</p>
                    { link && <Link to={link} target={linkTarget}>
                        <span className='h6'>{linkText}</span>
                    </Link>}
                </div>
            </div>
        </>
    )
}

const ExpandingBlocks = (props: ExpandingBlocksProps) => {
    const { blocks } = props;

    const renderBlocks = ( blocks: ContentBlockType[] ) => blocks.map( props => <Block {...props}/>);

    return (<div className="row expand-column-wrapper">
        {renderBlocks(blocks)}
    </div>)
}

export default ExpandingBlocks;