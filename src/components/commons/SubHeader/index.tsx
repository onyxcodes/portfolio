import React from 'react';
import './index.scss';

interface SubHeaderProps {
    cover?: string;
    image?: string;
    title: string;
    caption?: string;
}

const SubHeader = (props: SubHeaderProps) => {
    const {
        cover,
        image = cover,
        title,
        caption
    } = props;

    return <header className='subheader r-20-8 smr-4-5 '>
        <div className='subheader-bg' style={{
            backgroundImage: cover ? `url(${process.env.API_ENDPOINT}${cover})` : undefined
        }}
        >
            &nbsp;
            {/* TODO: span for accessibility */}
        </div>
        <div className='subheader-content-wrapper f jcc columns p1'>
            <div className='subheader-content col-9 f fd-row mfd-col'>
                {image && <div className='subheader-image-container'>
                    <div className='subheader-image r-5-4' style={{
                        backgroundImage: image ? `url(${process.env.API_ENDPOINT}${image})` : undefined
                    }}>
                        {/* TODO: span for accessibility */}
                    </div>
                </div>}
                <div className='subheader-caption f fd-col jce p1'>
                    <h1>{title}</h1>
                    {
                        caption && <p>{caption}</p>
                    }
                </div>
            </div>
        </div>
    </header>
}

export default SubHeader;