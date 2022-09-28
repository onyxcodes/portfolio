import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStrapiURL } from 'utils/strapi';

const contactSend = async ( payload: {} ) => {
    const { data } = await axios.post(
        getStrapiURL('/api/contactform/send'), payload, { "headers": {
                'Authorization': `Bearer ${process.env.API_TOKEN}`
            }
        }
    );
    return {
        success: data.success,
        error: data.error
    }; 
}

const sendContactInquiry = createAsyncThunk('sendContactInquiry',
    async ( arg: {}, thunkApi ) => {
        let response = await contactSend(arg);
        return response;
    }
);

export default sendContactInquiry;