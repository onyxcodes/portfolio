import React from 'react';
import './index.scss';

interface TextInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    inline?: boolean;
    labelSeparator?: string;
    required?: boolean;
    onChange?: ( arg?: string | null) => void;
    /* Method used to perform validation:
     * returns true or an error message when invalid
     * false when the field is valid!
     */
    validator?: ( arg?: string | null ) => boolean | string;
}
const TextInput = React.forwardRef(( props: TextInputProps, ref ) => {
    const { 
        name,
        label,
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
        checkValidity,
        getValidity: () => isInvalid,
        current: inputRef.current
    }), [isInvalid]);

    let inputClass = 'input-text f';
    if ( inline ) inputClass = `${inputClass} fd-row`;
    else inputClass = `${inputClass} fd-col`;

    if ( required ) inputClass = `${inputClass} input-required`;

    if ( isInvalid.length ) inputClass = `${inputClass} input-invalid`;

    const checkValidity = React.useCallback( () => {
        const value = inputRef?.current?.value;
        let errorMessages = [];
        // If provided, perform validator method
        if (validator) {
            let result = validator(value);
            // When the validator returns true or message
            // is invalid
            if (result) errorMessages.push(result);
        }
        // When field is required and is missing value, add the error
        if (required && !value) errorMessages.push('This field is mandatory');
        markInvalid(errorMessages);
    }, [inputRef.current, validator, required]);

    const onValueChange = React.useCallback( () => {
        const value = inputRef?.current?.value;
        onChange && onChange(value);
    }, [onChange, required]);

    const renderedErrors = React.useMemo( () => isInvalid.map( (err, i) => 
        <li key={i}>{ typeof err === 'string' ? err : 'Check this field' }</li>
    )
    , [isInvalid])

    return <div className={inputClass}>
        { label && 
            <label className='input-text-label' htmlFor={name}>{`${label}${labelSeparator}`}</label>
        }
        <input ref={inputRef} 
            type='text'
            onChange={onValueChange}
            placeholder={placeholder}
        />
        { isInvalid.length && <ul className='input-errors'>
            { renderedErrors }
        </ul>}
    </div>
});

export default TextInput;