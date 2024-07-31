import { TextBlockType } from 'features/content';
import React from 'react';
import Markdown from 'react-markdown';
import Code from 'components/commons/Code';
// import {
//     useLocation,
// } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import rehypeSlug from  'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import './index.scss';
import Heading from 'components/commons/Heading';

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
            <Markdown children={content}
                /* Adds remark plugins to:
                 * allow github flavored markdown
                */
                remarkPlugins={[remarkGfm]}
                /* Adds rehype plugins to:
                 * - add slugs to headings, prefixed with the component id
                 * (for uniqueness throughout the page)
                 * - add links to headers
                */
                rehypePlugins={[
                    [rehypeSlug, {prefix: id ? `${id}-` : undefined}],
                    [rehypeAutolinkHeadings, { content() {
                        /* TODO: Consider using hastscript library (https://github.com/syntax-tree/hastscript) 
                         * to generate hast node. Specification: https://github.com/rehypejs/rehype-autolink-headings#optionscontent
                         */
                        return [
                            {
                              type: 'element',
                              tagName: 'span',
                              properties: { className: 'icon icon-link t6'},
                              children: []
                            }
                        ]
                      }
                    }]
                ]}
                /* Components mapping
                 * code -> Code (when not inline)
                 * h{n} -> heading with scroll behavior related to location' hash
                 */
                components={{
                    code({node, className, children, ...props}) {
                        return <Code {...props} className={className} children={children}/>
                    },
                    h1({node, className, children, ...props}) {
                        return <Heading {...props} className='text-block-heading' level={1} children={children}/>
                    },
                    h2({node, className, children, ...props}) {
                        return <Heading {...props} className='text-block-heading' level={2} children={children} />
                    },
                    h3({node, className, children, ...props}) {
                        return <Heading {...props} className='text-block-heading' level={3} children={children}/>
                    },
                    h4({node, className, children, ...props}) {
                        return <Heading {...props} className='text-block-heading' level={4} children={children}/>
                    },
                    h5({node, className, children, ...props}) {
                        return <Heading {...props} className='text-block-heading' level={5} children={children}/>
                    },
                    h6({node, className, children, ...props}) {
                        return <Heading {...props} className='text-block-heading' level={6} children={children}/>
                    },
                }}
            />
        </div>
    </div>)
}

export default TextBlock;

