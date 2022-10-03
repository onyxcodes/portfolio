import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextArea from './';

export default {
    title: 'Commons/Form/TextArea',
    component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: 'story',
    label: 'Write a story',
    placeholder: 'It all began...',
    labelSeparator: '',
    lineNumber: 15,
};

export const Inline = Template.bind({});
Inline.args = {
    name: 'story',
    label: 'Write a story',
    placeholder: 'It all began...',
    lineNumber: 15,
    inline: true
};

export const Required = Template.bind({});
Required.args = {
    name: 'story',
    label: 'Write a story',
    placeholder: 'It all began...',
    lineNumber: 15,
    required: true,
};
