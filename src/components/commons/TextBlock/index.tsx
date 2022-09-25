import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './index.scss';

interface TextBlockProps {
    text: string;
}
const TextBlock = ( props: TextBlockProps ) => {
    const { text } = props;

    return(<div className='text-block p1 my1'>
        <ReactMarkdown  children={text} remarkPlugins={[remarkGfm]}/>
    </div>)
}

export default TextBlock;

