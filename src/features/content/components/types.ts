import { MediaType } from 'features/content/types';

export type ContentBlockType = {
    id?: number;
    __component?: string;
    bgColor: string;
    focusBgColor: string | null;
    captionTitle: string;
    captionColor: string;
    caption: string;
    captionTextAlignment: 'left' | 'center' | 'right';
    captionVisible: boolean;
    captionPositionX: 'start' | 'center' | 'end';
    captionPositionY: 'start' | 'center' | 'end';
    captionBgColor: string;
    captionBgAlpha: number;
    focusAnimation: 'shutter' | 'fade' | 'zoom-out' | 'fold';
    // Consider making compulsory since it must be populated
    background: {
        data: MediaType[]
    };
    focusBackground?: {
        data: MediaType[] | null
    };
    link: string | null;
    linkTarget: '_self' | '_blank';
    linkText: string;
}

export type ExpandingBlocksType = {
    id?: number;
    __component?: 'display.expanding-columns';
    blocks: ContentBlockType[];
}

export type TextBlockType = {
    id?: number;
    __component?: 'display.text-block';
    content: string;
    size?: 'xl' | 'l' | 'm';
    position?: 'start' | 'center' | 'end' ;
}

export type FileBlockType = {
    id?: number;
    __component?: 'display.file-block';
    title: string;
    files: {
        data: MediaType[]
    }
    size?: 'xl' | 'l' | 'm';
    position?: 'start' | 'center' | 'end' ;
}

export type MediaTextType = {
    id?: number;
    __component?: 'display.media-text-block';
    text: string;
    media: {
        data: MediaType
    }
    reverse: boolean;
}