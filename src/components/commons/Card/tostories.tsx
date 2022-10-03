import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from './';

export default {
    title: 'Commons/Card',
    component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
    listName: 'story',
    title: 'Lorem ipsum',
    content: 'Tortor posuere ac ut consequat semper viverra nam libero. Ut eu sem integer vitae justo eget. Sed velit dignissim sodales ut eu sem integer vitae. Maecenas pharetra convallis posuere morbi leo urna. Elit duis tristique sollicitudin nibh sit amet commodo',
    cover: require('assets/maintenance.svg'),
    url: 'tbd'
};