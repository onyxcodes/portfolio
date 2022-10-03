import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Select from './';

export default {
    title: 'Commons/Form/Select',
    component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: 'story',
    label: 'Select an option',
    options: [
        { label: 'First', value: 'first', selected: true },
        { label: 'Second', value: 'second' },
        { label: 'Third', value: 'third' },
    ]
};

export const NoSelection = Template.bind({});
NoSelection.args = {
    name: 'story',
    label: 'Select an option',
    options: [
        { label: 'First', value: 'first' },
        { label: 'Second', value: 'second' },
        { label: 'Third', value: 'third' },
    ]
};