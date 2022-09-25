import { TextBlockType } from 'features/content';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './index.scss';

interface TextBlockProps extends TextBlockType {
}
const TextBlock = ( props: TextBlockProps ) => {
    const { content,  size = 'l', position = 'center' } = props;

    let blockClass = 'text-block f';

    // Based on the position assign class to outer container
    switch ( position ) {
        case 'start':
            blockClass = `${blockClass} jcs`;
        break;
        case 'center':
            blockClass = `${blockClass} jcc`;
        break;
        case 'end':
            blockClass = `${blockClass} jce`;
        break;
    }

    // Based on the size assign class to inner container
    // consider that for bigger sizes should be centered for mobile devices
    // TODO: Consider changing 'm1' class to 'mx1' for smaller sizes
    let blockWrapperClass = 'text-block-wrapper p1 f fd-col'
    switch ( size ) {
        case 'xl':
            blockClass = `${blockClass} jcc-sm`;
            blockWrapperClass = `${blockWrapperClass} col-12`;
        break;
        case 'l':
            blockClass = `${blockClass} jcc-sm`;
            blockWrapperClass = `${blockWrapperClass} m1 col-9 col-lg-10 col-sm-11`;
        break;
        case 'm':
            // blockClass = `${blockClass}`;
            blockWrapperClass = `${blockWrapperClass} m1 col-7 col-lg-8 col-sm-9`;
        break;
    }

    return(<div className={blockClass}>
        <div className={blockWrapperClass}>
            <ReactMarkdown  children={content} remarkPlugins={[remarkGfm]}/>
        </div>
    </div>)
}

export default TextBlock;

