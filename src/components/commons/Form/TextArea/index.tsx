import { InputProps, InputRefType } from 'components/commons/Form/types';
import React from 'react';
import './index.scss';

interface TextAreaProps extends InputProps {
    lineNumber?: number
}
const TextArea = React.forwardRef( ( props: TextAreaProps, ref: React.ForwardedRef<InputRefType> ) => {
    const { 
        name,
        label,
        onChange,
        validator,
        required = false,
        placeholder,
        inline = false,
        labelSeparator = ':',
        lineNumber = 10
    } = props;

    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    const [ isInvalid, markInvalid ] = React.useState<(string | boolean)[]>([]);

    /* Adds new properties to the returned ref:
     * a method to know whether the component is valid or not.
     * a method to trigger the field validation
     */
    React.useImperativeHandle(ref, () => ({
        isInputRefType: true,
        checkValidity,
        getValidity: () => isInvalid,
        current: inputRef.current
    }), [isInvalid]);

    let inputClass = 'input-textarea f',
        inputWrapperClass = 'input-wrapper-class m05 f';

    if ( inline ) inputWrapperClass = `${inputWrapperClass} fd-row`;
    else inputWrapperClass = `${inputWrapperClass} fd-col`;

    if ( required ) inputClass = `${inputClass} input-required`;

    if ( isInvalid.length ) inputClass = `${inputClass} input-invalid`;

    // Based on size assign classes
    inputClass = `${inputClass} col-12`;

    const checkValidity = React.useCallback( () => {
        const value = inputRef?.current?.value;
        let errorMessages = [];
        // If provided, perform validator method
        if (validator) {
            let result = validator(value!);
            // When the validator returns true or message
            // is invalid
            if (result) errorMessages.push(result);
        }
        // When field is required and is missing value, add the error
        if (required && !value) errorMessages.push('This field is mandatory');
        markInvalid(errorMessages);
        return errorMessages;
    }, [inputRef.current, validator, required]);

    const onValueChange = React.useCallback( () => {
        const value = inputRef?.current?.value;
        onChange && onChange(value);
        checkValidity();
    }, [onChange, required]);

    /* Transforms 'isInvalid' array of errors into a list
     */
    const renderedErrors = React.useMemo( () => isInvalid.map( (err, i) => 
        <li key={i}>{ typeof err === 'string' ? err : 'Check this field' }</li>
    ), [isInvalid]);

    return <div className={inputClass}>
        <div className={inputWrapperClass}>
            { label && 
                <label className='input-textarea-label' htmlFor={name}>{`${label}${labelSeparator}`}</label>
            }
            <textarea ref={inputRef} 
                onChange={onValueChange}
                placeholder={placeholder}
                rows={lineNumber}
            />
            { isInvalid.length ? <ul className='input-errors my05 t6'>
                { renderedErrors }
            </ul> : <></>}
        </div>
    </div>
});

export default TextArea;