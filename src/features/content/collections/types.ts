import { TextBlockType, FileBlockType, ExpandingBlocksType, MediaTextType, FormBlockType, TextInputFieldType } from 'features/content';
import { MediaType } from 'features/content/types';

export type ArticleType = {
    id: number;
    attributes: {
        title: string;
        description: string | null;
        content: TextBlockType[] | FileBlockType[] | MediaTextType[];
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

export type PageType = {
    id: number;
    attributes: {
        title: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        slug: string;
        content: TextBlockType[] | FileBlockType[] | ExpandingBlocksType[] | MediaTextType[] | FormBlockType[];
        fullScreenContent: boolean;
    }
}

export type FormType = {
    id: number;
    attributes: {
        title: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        inputs: TextInputFieldType[]
    }
}
