import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Alert from './'
import Button from 'components/commons/Button';

export default {
  title: 'Commons/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Info = Template.bind({});
Info.args = {
  level: 'info',
  message: 'This is an info alert'
};

export const Prompt = Template.bind({});
Prompt.args = {
  level: 'info',
  message: 'This is an prompt alert',
  buttons: [
    <Button>Yes</Button>,
    <Button>No</Button>
  ]
};

export const Warning = Template.bind({});
Warning.args = {
  level: 'warning',
  message: 'This is an warning alert'
};

export const Error = Template.bind({});
Error.args = {
  level: 'error',
  message: 'This is an error alert'
};

export const Debug = Template.bind({});
Debug.args = {
  level: 'debug',
  message: 'This is an debug alert'
};
