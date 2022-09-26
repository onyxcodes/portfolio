import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStrapiURL } from 'utils/strapi';

const listArticles = async (page: number, pageSize: number) => {
    let requestURL = '/api/articles'
        .concat(`?pagination[page]=${page}`)
        .concat(`&pagination[pageSize]=${pageSize}`)
        .concat('&populate[0]=cover')
    const { data } = await axios.get(
        getStrapiURL(requestURL), {
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
    let requestURL = `/api/articles?filters[slug][$eq]=${slug}`
        .concat('&sort[0]=publishedAt%3Adesc')
        .concat('&populate[0]=cover')
        .concat('&populate[1]=content')
        .concat('&populate[2]=content.files')
        .concat('&populate[3]=content.media')
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