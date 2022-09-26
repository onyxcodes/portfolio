import axios from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { getStrapiURL } from 'utils/strapi';

const listArticles = async (page: number, pageSize: number, order?: string) => {
    let requestURL = '/api/articles'
        .concat(`?pagination[page]=${page}`)
        .concat(`&pagination[pageSize]=${pageSize}`)
        .concat('&populate[0]=cover')
    if (order) requestURL = requestURL.concat(`&sort[0]=${encodeURIComponent(order)}`);
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

const resetArticles = createAction('resetArticles');

const listAction = createAsyncThunk('listArticles',
    async ( args: {
        page: number;
        pageSize: number,
        sort: string
    }, thunkApi ) => {
        let response = await listArticles(args.page, args.pageSize, args.sort);
        return response;
    }
);

const getAction = createAsyncThunk('getArticle', 
    async ( slug: string, thunkApi) => {
        let response = await getArticle(slug);
        return response;
    }
);


export { listAction as listArticles, resetArticles };
export default getAction;