import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStrapiURL } from 'utils/strapi';

const getPage = async ( slug: string ) => {
    let requestURL = `/api/pages?filters[slug][$eq]=${slug}`
        .concat('&populate[0]=content')
        .concat('&populate[1]=content.files')
        .concat('&populate[2]=content.blocks')
        .concat('&populate[3]=content.blocks.background')
        .concat('&populate[4]=content.media')
        .concat('&populate[5]=content.form')
        .concat('&populate[6]=content.form.inputs')
    const { data } = await axios.get(
        getStrapiURL(requestURL), {
            'method': 'GET',
            "headers": {
                'Authorization': `Bearer ${process.env.API_TOKEN}`
            }
        }
    );
    return data.data[0];
}

const getAction = createAsyncThunk('getPage', 
    async ( slug: string, thunkApi) => {
        let response = await getPage(slug);
        return response;
    }
);

export default getAction;