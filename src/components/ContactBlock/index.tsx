import React from 'react';
import './index.scss';
import TextInput from 'components/commons/Form/TextInput';
import Form from 'components/commons/Form';

const ContactBlock = () => {
    return <>
        <Form name='contact'>
            <TextInput
                name='test'
                label='Enter some text' required 
                placeholder='Write here your name'
                // onChange={(value) => console.log(value)}
            />
            <span>Got any ref here?</span>
        </Form>   
    </>
}

export default ContactBlock;