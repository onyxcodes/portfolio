import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStrapiURL } from 'utils/strapi';

const listArticles = async (page: number, pageSize: number) => {
    const { data } = await axios.get(
        getStrapiURL(`/api/articles?populate[0]=cover&pagination[page]=${page}&pagination[pageSize]=${pageSize}`), {
            'method': 'GET',
            "headers": {
                'Authorization': `Bearer ${process.env.API_TOKEN}`

            }
        }
    );
    return {
        data: data.data,
        meta: data.meta.pagination
    };   
}

// TODO: Consider implementing getArticleById
const getArticle = async ( slug: string ) => {
    const { data } = await axios.get(
        getStrapiURL(`/api/articles?populate[0]=cover&populate[1]=content&populate[2]=content.files&filters[slug][$eq]=${slug}`), {
            'method': 'GET',
            "headers": {
                'Authorization': `Bearer ${process.env.API_TOKEN}`

            }
        }
    );
    return data.data[0];
}

const listAction = createAsyncThunk('listArticles',
    async ( args: {
        page: number;
        pageSize: number
    }, thunkApi ) => {
        let response = await listArticles(args.page, args.pageSize);
        return response;
    }
);

const getAction = createAsyncThunk('getArticle', 
    async ( slug: string, thunkApi) => {
        let response = await getArticle(slug);
        return response;
    }
);


export { listAction as listArticles };
export default getAction;