import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MediaContentType } from '.';

export type FeaturedBlockType = {
    id: number;
    bgColor: string;
    focusBgColor: string;
    captionTitle: string;
    captionColor: string;
    caption: string;
    captionTextAlignment: 'left' | 'center' | 'right';
    captionVisible: boolean;
    captionPositionX: 'start' | 'center' | 'end';
    captionPositionY: 'start' | 'center' | 'end';
    captionBgColor: string;
    captionBgAlpha: number;
    focusAnimation: any; // TODO
    background: {
        data: MediaContentType[]
    };
    link?: string;
    linkTarget: '_self' | '_blank';
    linkText: string;
}
const loadHome = async () => {
    const { data } = await axios.get(
        `${process.env.API_ENDPOINT}/api/homepage?populate[0]=featured&populate[1]=featured.block&populate[2]=featured.block.background`, {
            'method': 'GET',
            "headers": {
                'Authorization': `Bearer ${process.env.API_TOKEN}`

            }
        }
    );
    return data.data.attributes.featured;   
}

const action = createAsyncThunk('loadHome',
    async ( fakeArg: boolean, thunkApi ) => {
        let response = await loadHome();
        return response;
    }
);

export default action;