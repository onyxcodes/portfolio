import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextInput from './';

export default {
    title: 'Commons/Form/TextInput',
    component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: 'story',
    type: 'text',
    label: 'Your favorite color',
    placeholder: 'emerald red'
};

export const Email = Template.bind({});
Email.args = {
    name: 'story',
    type: 'email',
    label: 'Your email address',
};

export const Inline = Template.bind({});
Inline.args = {
    name: 'story',
    label: 'Your favorite color',
    type: 'text',
    inline: true,
    labelSeparator: ''
};

export const Required = Template.bind({});
Required.args = {
    name: 'story',
    type: 'text',
    label: 'Your favorite color',
    required: true,
};