import React from 'react';
import './index.scss';

import { InputProps, InputRefType } from 'components/commons/Form/types'

export interface TextInputProps extends InputProps {
    // TODO: Extend with other compatible types
    type: 'text' | 'email';
}
const TextInput = React.forwardRef( ( props: TextInputProps, ref: React.ForwardedRef<InputRefType> ) => {
    const { 
        name,
        label,
        type,
        onChange,
        validator,
        required = false,
        placeholder,
        inline = false,
        labelSeparator = ':'
    } = props;
    
    const inputRef = React.useRef<HTMLInputElement>(null);

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

    let inputClass = 'input-text f',
        inputWrapperClass = 'input-wrapper-class m05 f';

    if ( inline ) inputWrapperClass = `${inputWrapperClass} fd-row`;
    else inputWrapperClass = `${inputWrapperClass} fd-col`;

    if ( required ) inputClass = `${inputClass} input-required`;

    if ( isInvalid.length ) inputClass = `${inputClass} input-invalid`;

    // Based on size assign classes
    inputClass = `${inputClass} col-4 col-lg-8 col-sm-12`;

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
                <label className='input-text-label' htmlFor={name}>{`${label}${labelSeparator}`}</label>
            }
            <input ref={inputRef} 
                type={type}
                onChange={onValueChange}
                placeholder={placeholder}
            />
            { isInvalid.length ? <ul className='input-errors my05 t6'>
                { renderedErrors }
            </ul> : <></>}
        </div>
    </div>
});

export default TextInput;