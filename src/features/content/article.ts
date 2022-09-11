import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MediaContentType } from '.';

export type ArticleType = {
    id: number;
    attributes: {
        title: string;
        content: string;
        slug: string;
        createdAt: string;
        publishedAt: string;
        updatedAt: string;
        locale: string;
        cover: {
            data: MediaContentType
        }
    }
    
} 

const listArticles = async (page: number, pageSize: number) => {
    const { data } = await axios.get(
        `${process.env.API_ENDPOINT}/api/articles?populate[0]=cover&pagination[page]=${page}&pagination[pageSize]=${pageSize}`, {
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

const getArticle = async ( slug: string ) => {
    const { data } = await axios.get(
        `${process.env.API_ENDPOINT}/api/articles?populate[0]=cover&filters[slug][$eq]=${slug}`, {
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