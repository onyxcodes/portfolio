import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStrapiURL } from 'utils/strapi';

const getPage = async ( slug: string ) => {
    const { data } = await axios.get(
        getStrapiURL(`/api/pages?filters[slug][$eq]=${slug}&populate[0]=content&populate[1]=content.files&populate[2]=content.blocks&populate[3]=content.blocks.background`), {
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