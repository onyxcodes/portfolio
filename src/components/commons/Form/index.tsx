import React from 'react';
import './index.scss';

interface FormProps {
    children: JSX.Element | JSX.Element[];
    name: string;
}
const Form = ( props: FormProps ) => {
    const { children } = props;
    const inputsRef = React.useRef<JSX.Element[]>([]);

    const _children = ([] as JSX.Element[]).concat(children);

    // Clears inputs ref when children changes
    React.useEffect( () => {
        inputsRef.current = inputsRef.current.slice(0, _children.length);
    }, [_children]);

    /* Works correctly when all children can be referenced. 
     * Therefore React components must forward ref.
     * Uses callback ref to dinamically populate ref array
     */
    const renderedChildren = React.useMemo( () => _children.map( (child, i) => {
        return <child.type key={i} 
            ref={(el: JSX.Element) => inputsRef.current[i] = el}
        {...child.props} />
    }), [_children]);
    
    if ( inputsRef.current ) debugger;

    return <div className='form'>
        { renderedChildren }
    </div>
}

export default Form;