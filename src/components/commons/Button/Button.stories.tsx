import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './';

export default {
  title: 'Commons/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'default',
  children: 'Button',
};

export const Primary = Template.bind({});
Primary.args = {
    type: 'primary',
    children: 'Button',
};

export const Text = Template.bind({});
Text.args = {
    type: 'text',
    children: 'Button',
};
