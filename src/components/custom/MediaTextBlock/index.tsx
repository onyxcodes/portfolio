import React from 'react';
import './index.scss';
import { MediaTextType } from 'features/content'
import { getStrapiMedia } from 'utils/strapi';
import TextBlock from 'components/commons/TextBlock';

// Consider supporting different sizes (will alter
// the media container size only?)
const MediaTextBlock = ( props: MediaTextType ) => {
    const { text, media, reverse = false } = props;
    const _media = getStrapiMedia(media.data);


    let wrapperClass = 'mediatext-wrapper f fd-row',
        mediaContainerClass = 'mediatext-media-container r-5-4',
        textContainerClass = 'mediatext-text-container f jcc';

    if (reverse) {
        wrapperClass = `${wrapperClass} reverse`;
        textContainerClass = `${textContainerClass} first`;
    } else {
        textContainerClass = `${textContainerClass} second`;
    }

    return <div className='mediatext-block p1'>
        <div className={wrapperClass}>
            <div className={mediaContainerClass}
                style={{
                    backgroundImage: _media.type?.startsWith('image') ? `url('${_media.url}')` : undefined,
                }}
            >
                { _media.type?.startsWith('video') && 
                    <video className='block-bgvideo' playsInline autoPlay muted loop>
                    <source src={_media.url} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video> }
            </div>
            <div className={textContainerClass}>
                <TextBlock content={text}/>
            </div>
        </div>
    </div>
}

export default MediaTextBlock;