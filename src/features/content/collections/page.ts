import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStrapiURL } from 'utils/strapi';

const getPage = async ( slug: string ) => {
    const { data } = await axios.get(
        getStrapiURL(`/api/pages?populate[0]=content&filters[slug][$eq]=${slug}&populate[1]=content.files`), {
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