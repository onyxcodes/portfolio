import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ActionBar from './';
import Button from 'components/commons/Button';

export default {
    title: 'Commons/ActionBar',
    component: ActionBar,
    argTypes: {
        bgColor: { control: 'color' },
    },
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof ActionBar>;

const Template: ComponentStory<typeof ActionBar> = (args) => <ActionBar {...args} />;

export const Top = Template.bind({});
Top.args = {
    position: 'top',
    items: [
        {item: <span>One</span>, position: 'left'},
        {item: <span>Two</span>, position: 'left'},
        {item: <span>Three</span>, position: 'left'},
        {item: <span>Title</span>, position: 'center'},
        {item: <span>Four</span>, position: 'right'},
        {item: <span>Five</span>, position: 'right'},
        {item: <span>Six</span>, position: 'right'},
    ],
    bgColor: '#333333'
};

export const Bottom = Template.bind({});
Bottom.args = {
    position: 'bottom',
    items: [
        {item: <Button>Previous</Button>, position: 'left'},
        {item: <span>Page 1</span>, position: 'center'},
        {item: <Button>Next</Button>, position: 'right'},
    ],
    bgColor: '#333333'
};