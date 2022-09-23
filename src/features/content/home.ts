import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStrapiURL } from 'utils/strapi';


const loadHome = async () => {
    const { data } = await axios.get(
        getStrapiURL('/api/homepage?populate[0]=featured&populate[1]=featured.block&populate[2]=featured.block.background'), {
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