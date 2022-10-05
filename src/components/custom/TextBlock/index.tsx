import { TextBlockType } from 'features/content';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Code from 'components/commons/Code';
// import {
//     useLocation,
// } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import rehypeSlug from  'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import './index.scss';

interface TextBlockProps extends TextBlockType {
}
const TextBlock = ( props: TextBlockProps ) => {
    const { id, content, size = 'l', position = 'center' } = props;

    let blockClass = 'text-block f aic py1';

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
            <ReactMarkdown children={content}
                /* Adds remark plugins to:
                 * allow github flavored markdown
                */
                remarkPlugins={[remarkGfm]}
                /* Adds rehype plugins to:
                 * add slugs to headings, prefixed with the component id
                 * (for uniqueness throughout the page)
                */
                rehypePlugins={[
                    [rehypeSlug, {prefix: id ? `${id}-` : undefined}],
                    rehypeAutolinkHeadings
                ]}
                /* Components mapping
                 * code -> Code (when not inline)
                 */
                components={{
                    code({node, inline, className, children, ...props}) {
                        if (!inline) {
                            return <Code className={className} children={children}/>
                        }
                        return <code className={className} {...props}>
                            {children}
                        </code>
                    },
                    // Map some of the heading tags to a custom (common) component
                    // which makes leverage of react-router useLocation to check the hash
                    // if the hash corresponds to the compone tid property
                    // use the reference the components itself instantiate to scroll into view
                }}
            />
        </div>
    </div>)
}

export default TextBlock;

