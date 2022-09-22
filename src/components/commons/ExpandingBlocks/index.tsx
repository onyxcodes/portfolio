import React from 'react';
import Link from 'components/commons/Link';
import './index.scss';

import { hex2rgba } from 'utils/colors';
import useTouchSelection from 'components/commons/useTouchSelection';

export type ColumnProps = {
    id: number;
    key: string;
    focusAnimation?: string
    captionTitle: string;
    caption: string;
    captionColor: string;
    captionBgColor: string;
    captionPositionY: 'start' | 'center' | 'end',
    captionPositionX: 'start' | 'center' | 'end',
    captionBgAlpha: number;
    captionTextAlignment: 'left' | 'center' | 'right';
    background: {
        url: string;
        alt: string;
        type?: string;
    }[],
    bgColor?: string;
    link: string | null;
    linkTarget: '_self' | '_blank';
    linkText: string;
}
interface ExpandingBlocksProps {
    blocks: ColumnProps[]
}

const Block = ( props: ColumnProps ) => {
    const { background, caption, captionTitle, captionPositionY, captionPositionX, bgColor = '#999',
    captionBgColor, captionColor, captionBgAlpha,
    captionTextAlignment,
    link, linkTarget, linkText
} = props;

    const [ activeBackground, setBackground ] = React.useState({
        index: 0,
        url: background[0].url,
        alt: background[0].alt,
        type: background[0].type || 'image'
    });

    React.useEffect( () => {
        let timeoutId: number;
        if ( background.length > 1 ) {
            let index = (activeBackground.index+1 < background.length) ? activeBackground.index+1 : 0;
            timeoutId = window.setTimeout( () => setBackground({
                index: index,
                url: background[index].url,
                alt: background[index].alt,
                type: background[index].type || 'image'
            }), 5000)
        }
        return () => {
            // cleanup
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [background, activeBackground]);

    const style = {
        backgroundolor: bgColor,
        backgroundImage: activeBackground.type === 'image' ? `url('${activeBackground.url}')` : undefined,
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
                {activeBackground.type === 'video' && 
                    <video className='block-bgvideo' playsInline autoPlay muted loop>
                    <source src={activeBackground.url} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                }
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

    const renderBlocks = ( blocks: ColumnProps[] ) => blocks.map( props => <Block {...props}/>);

    return (<div className="row expand-column-wrapper">
        {renderBlocks(blocks)}
    </div>)
}

export default ExpandingBlocks;