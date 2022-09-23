import { TextBlockType, FileBlockType } from 'features/content';
import { MediaType } from 'features/content/types';

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
            data: MediaType
        }
    }
    
} 

export type PageType ={
    id: 1,
    attributes: {
        title: string,
        createdAt: string,
        updatedAt: string;
        publishedAt: string;
        slug: string;
        content: TextBlockType[] | FileBlockType[]
    }
}