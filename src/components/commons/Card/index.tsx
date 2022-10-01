import React from 'react';
import './index.scss';
import Link from 'components/commons/Link';

export interface CardProps {
    key: string;
    listName: string;
    title: string;
    content?: string | null;
    cover?: string;
    url: string;
}
const Card = (props: CardProps) => {
    const { cover, title, content, url, listName } = props;
    let cardClass = 'card r-5-2 col-5 smr-4-5 col-lg-10 col-sm-12 m1';

    let excerpt; 
    
    if (content) {
        if ( cover && content.length > 250 ) {
            excerpt = content.slice(0, 250).concat('...')
        } else if ( content.length > 1000 ) {
            excerpt = content.slice(0, 1000).concat('...')
        }
    }

    return <div tabIndex={0} className={cardClass}>
        <div className='card-content'>
            <div className='card-wrapper f fd-row mfd-col'>
                {cover && <div className='card-cover r-5-4'
                    style={{
                        backgroundImage: `url(${cover})`
                    }}
                >
                    &nbsp;
                </div>}
                <div className='card-caption p1'>
                    <h5>{title}</h5>
                    {excerpt}
                </div>
                <div className='card-content-link'>
                    <Link to={url}>Read more</Link>
                </div>
            </div>
        </div>
    </div>;
}

export default Card;