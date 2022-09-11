import React from 'react';
import ReactMarkdown from 'react-markdown';
import './index.scss';

interface TextBlockProps {
    text: string;
}
const TextBlock = ( props: TextBlockProps ) => {
    const { text } = props;

    return(<div className='text-block p1'>
        <ReactMarkdown  children={text} />
    </div>)
}

export default TextBlock;

