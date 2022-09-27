import React from 'react';
import './index.scss';
import Button from 'components/commons/Button';
import { InputRefType } from 'components/commons/Form/types';

interface FormProps {
    children: JSX.Element | JSX.Element[];
    name?: string;
    onSubmit?: ( formData: {}[] ) => void;
}
const Form = ( props: FormProps ) => {
    const { children, name, onSubmit } = props;
    const inputsRef = React.useRef<(InputRefType)[]>([]);
    const [ isInvalid, markInvalid ] = React.useState(false);

    // Assures that _children is an array, event when it's not
    const _children = ([] as JSX.Element[]).concat(children);

    // Clears inputs ref list when children changes
    React.useEffect( () => {
        inputsRef.current = inputsRef.current.slice(0, _children.length);
    }, [_children]);

    /* Callback ref that filters, accepting only references
     * having isInputRefType as property, or rather InputRefTypes
     */
    const addInputRef = (element: JSX.Element | InputRefType, i: number) => {
        if ( element && element.hasOwnProperty('isInputRefType') ) {
            return inputsRef.current[i] = element as InputRefType;
        }
    }

    /* Works correctly when all children can be referenced. 
     * Therefore React components must forward ref.
     * Uses callback ref to dinamically populate ref array
     */
    const renderedChildren = React.useMemo( () => _children.map( (child, i) => {
        return <child.type key={i} 
            ref={(el: JSX.Element | InputRefType) => addInputRef(el,i)}
        {...child.props} />
    }), [_children]);
    
    const submitForm = () => {
        let validity = [],
            /* formData is an array of objects describing a field's by
             * providing it's name (by design of InputRefType mandatory!) and its value
             */
            formData: {
                name: string;
                value: string | undefined
            }[] = [];

        for ( const inputRef of inputsRef.current ) {

            // Checks field's validity and adds error, if present
            let inputValidity = inputRef.checkValidity();
            if ( inputValidity.length ) validity.push(inputValidity);

            // Wraps field's data in an object and add it to form's data
            let inputData = {
                name: inputRef.current?.name!,
                value: inputRef.current?.value
            }
            formData.push(inputData)
        }

        // Marks the form as invalid when there is at least one field error
        if ( validity.length ) {
            markInvalid(true);
        } else {
            markInvalid(false);
            // When provided, executes callback 'onSubmit' with form's data
            onSubmit && onSubmit(formData)
        }
    }

    return <form name={name}>
        <div className='form-fields my05'>{renderedChildren}</div>
        {/* TODO: Make a prop to provide custom elements for form submission */}
        <Button type='primary' className='form-submit f-right' onClick={() => submitForm()}>Submit</Button>
        { isInvalid ? 
            <span className='form-error t6 my05'>Check the fields for errors</span> : null
        }
    </form>
}

export default Form;