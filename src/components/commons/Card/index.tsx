import React from 'react';
import './index.scss';
import ReactMarkdown from 'react-markdown';
import Link from 'components/commons/Link';
import useTouchSelection from 'components/commons/useTouchSelection';

export interface CardProps {
    key: string;
    listName: string;
    title: string;
    content: string;
    cover?: string;
    url: string;
}
const Card = (props: CardProps) => {
    const { cover, title, content, url, listName } = props;
    let cardClass = 'card r-4-5 col-3 col-lg-5 col-sm-12 m1';

    const { TouchSelector, touchHandler } = useTouchSelection('card-selector', listName);

    let excerpt = cover ? content.slice(0, 250) : content.slice(0, 1000);
    let cardContent = <ReactMarkdown disallowedElements={['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a']} children={excerpt} />

    return <div className={cardClass}>
        <div className='card-content' onClick={() => touchHandler()}>
            <TouchSelector />
            {cover && <div className='card-cover r-5-4'
                style={{
                    backgroundImage: `url(${cover})`
                }}
            >
                &nbsp;
            </div>}
            <div className='card-caption p1'>
                <h5>{title}</h5>
                {cardContent}
            </div>
            <div className='card-content-link'>
                <Link to={url}>Read more</Link>
            </div>
        </div>
    </div>;
}

export default Card;