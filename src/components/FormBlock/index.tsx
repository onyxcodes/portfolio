import React from 'react';
import './index.scss';
import { FormBlockType } from 'features/content';

import TextInput from 'components/commons/Form/TextInput';
import TextArea from 'components/commons/Form/TextArea';
import Form from 'components/commons/Form';

const FormBlock = ( props: FormBlockType ) => {
    const { 
        name, form,
        size = 'l', position = 'center'
    } = props;

    const _form = form.data.attributes;

    let blockClass = 'form-block f aic';

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
    let blockWrapperClass = 'form-block-wrapper f p1 fd-col'
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

    // TODO: Consider moving default validator methods to another file, and import them

    /* Validates wheter the input value is less than given
     * maximum characters length and, if provided, more than
     * minimum characters length
     */
    const textInputValidator = (
        inputValue: string | null,
        maxLength: number,
        minLength: number | null
    ) => {
        if ( inputValue ) {
            if (inputValue.length > maxLength ) return `Field should not exceed ${maxLength} characters`;
            else if ( minLength && inputValue.length < minLength ) return `Field should have at least ${minLength} characters`;
            else return false;
        } else {
            return false;
        }
    }

    /* Validates wheter the input value is less than given
     * maximum characters length and, if provided, more than
     * minimum characters length. Since it's an email, first check against
     * regex that it has the correct format
     * Inspo for regex: 
     */
    const emailInputValidator = (
        inputValue: string | null,
        maxLength: number,
        minLength: number | null
    ) => {
        if ( inputValue ) {
            let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,63}$/;
            if ( !regex.test(inputValue ) ) return 'Invalid email format';
            else if (inputValue.length > maxLength ) return `Field should not exceed ${maxLength} characters`;
            else if ( minLength && inputValue.length < minLength ) return `Field should have at least ${minLength} characters`;
            else return false;
        } else {
            return false;
        }
    }

    /* Maps provided inputs configuration to specific Input elements
     * alongside their required characteristics (validators)
     */
    const renderInputs = React.useMemo( () => {
        let results: JSX.Element[] = [];
       _form.inputs.forEach( (input, i) => {
            switch(input.type) {
                case 'text':
                    results.push(<TextInput key={i}
                        name={input.name} type={input.type} 
                        label={input.label!} placeholder={input.placeholder!}
                        required={input.required}
                        validator={(value) => textInputValidator(value, input.maxLength, input.minLength)}
                    />)
                break;
                case 'email':
                    results.push(<TextInput key={i}
                        name={input.name} type={input.type} 
                        label={input.label!} placeholder={input.placeholder!}
                        required={input.required}
                        validator={(value) => emailInputValidator(value, input.maxLength, input.minLength)}
                    />)
                break;
                case 'textarea':
                    results.push(<TextArea key={i}
                        name={input.name}
                        label={input.label!} placeholder={input.placeholder!}
                        required={input.required}
                        validator={(value) => textInputValidator(value, input.maxLength, input.minLength)}
                    />)
                break;
            }
        })
        return results;
    }, [_form.inputs]);

    return <div className={blockClass}>
        <div className={blockWrapperClass}>
            <h2>{_form.title}</h2>
            { _form.description ? <p>{_form.description}</p> : null }
            <Form name={name}>
                { renderInputs }
            </Form>  
        </div>
    </div>
}

export default FormBlock;