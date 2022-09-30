import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Loader from './';
import OnyxLogo from 'components/OnyxLogo';

export default {
    title: 'Commons/Loader',
    component: Loader,
    parameters: {
        layout: 'fullscreen',
    },
  } as ComponentMeta<typeof Loader>;

  const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {
  show: true,
  mask: true,
};

export const Custom = Template.bind({});
Custom.args = {
  show: true,
  mask: true,
  element: <div className='loading-logo'>
    <OnyxLogo isAnimated/>
    </div>
};