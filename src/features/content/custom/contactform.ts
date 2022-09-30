import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStrapiURL } from 'utils/strapi';
import notify from 'features/ui/notify'
import { NotificationType } from 'features/ui';

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
        const { dispatch, rejectWithValue } = thunkApi;
        let response = await contactSend(arg);
        if (!response.success) {
            throw rejectWithValue({
                success: false,
                error: 'Problem while communicating with api server'
            }); 
        }
        let notification: NotificationType = {
            id: thunkApi.requestId,
            level: 'info',
            message: 'Your inquiry was successfully submitted.',
            clearable: true
        }
        dispatch(notify(notification));
        return response;
    }
);

export default sendContactInquiry;