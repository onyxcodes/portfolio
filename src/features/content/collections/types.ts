import { TextBlockType, FileBlockType, ExpandingBlocksType, MediaTextType } from 'features/content';
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

export type PageType ={
    id: 1,
    attributes: {
        title: string,
        createdAt: string,
        updatedAt: string;
        publishedAt: string;
        slug: string;
        content: TextBlockType[] | FileBlockType[] | ExpandingBlocksType[] | MediaTextType[];
        fullScreenContent: boolean;
    }
}