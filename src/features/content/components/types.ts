import { MediaType } from 'features/content/types';

export type ContentBlockType = {
    id: number;
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

export type TextBlockType = {
    id: number;
    __component?: string;
    content: string;
}

export type FileBlockType = {
    id: number;
    __component?: string;
    files: {
        data: MediaType[]
    }
}