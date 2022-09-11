import { createReducer } from '@reduxjs/toolkit';
import loadHome, { FeaturedBlockType } from './home';
import fetchMenu, { MenuEntry } from './menu';
import getArticle, { listArticles, ArticleType } from './article';


type PaginationParams = {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number
}

export type MediaContentType = {
    id: number,
    attributes: {
        name: string;
        alternativeText: string;
        caption: string;
        width: number | null,
        height: number | null,
        formats: any,
        hash: string,
        ext: string,
        mime: string,
        size: number;
        url: string;
        provider: string;
        provider_metadata: any;
        createdAt: string;
        updatedAt: string;
    }
}

export interface ContentState {
    menu: {
        main: {
            loading: boolean;
            error: any;
            data: MenuEntry[] | null;
        },
        footer: {
            loading: boolean;
            error: any;
            data: any;
        }
    },
    home: {
        loading: boolean,
        error: any;
        featured: FeaturedBlockType[]
    },
    articlesOp: {
        loading: boolean;
        error: any;
        data: ArticleType[];
        meta: PaginationParams | null;
    },
    articleOp: {
        loading: boolean;
        error: any;
        data: ArticleType | null
    }
}

const initialState = {
    menu: {
        main: {
            loading: false,
            error: null,
            data: null
        },
        footer: {
            loading: false,
            error: null,
            data: null
        },
    },
    home: {
        loading: false,
        error: null,
        featured: []
    },
    articlesOp: {
        loading: false,
        error: null,
        data: [],
        meta: null
    },
    articleOp: {
        loading: false,
        error: null,
        data: null
    }
} as ContentState;

const reducer = createReducer(initialState, builder => { builder
    // load home
    .addCase(loadHome.pending, (state, action) => {
        state.home.loading = true;
        state.home.featured = initialState.home.featured;
        state.home.error = initialState.home.error;
    })
    .addCase(loadHome.fulfilled, (state, action) => {
        state.home.loading = false;
        state.home.featured = action.payload.block;
    })
    .addCase(loadHome.rejected, (state, action) => {
        state.home.loading = false;
        debugger;
    })
    // fetchMenus
    .addCase(fetchMenu.pending, (state, action) => {
        if (action.meta.arg === 'main') {
            state.menu.main.loading = true;
            state.menu.main.data = initialState.menu.main.data;
            state.menu.main.error = initialState.menu.main.data;
        }
    })
    .addCase(fetchMenu.fulfilled, (state, action) => {
        if (action.meta.arg === 'main') {
            state.menu.main.loading = false;
            state.menu.main.data = action.payload;
        }
    })
    .addCase(fetchMenu.rejected, (state, action) => {
        if (action.meta.arg === 'main') {
            state.menu.main.loading = false;
            state.menu.main.error = true;
        }
    })

    // list Articles
    .addCase(listArticles.pending, (state, action) => {
        state.articlesOp.loading = true;
        state.articlesOp.data = initialState.articlesOp.data;
        state.articlesOp.error = initialState.articlesOp.error;
    })
    .addCase(listArticles.fulfilled, (state, action) => {
        state.articlesOp.loading = initialState.articlesOp.loading;
        state.articlesOp.error = initialState.articlesOp.error;
        state.articlesOp.data = action.payload.data;
        state.articlesOp.meta = action.payload.meta;
    })
    .addCase(listArticles.rejected, (state, action) => {
        state.articlesOp.loading = initialState.articlesOp.loading;
        debugger;
        // state.articlesOp.error = initialState.articlesOp.error;
    })

    // fetch article
    .addCase(getArticle.pending, (state, action) => {
        state.articleOp.loading = true;
        state.articleOp.data = initialState.articleOp.data;
        state.articleOp.error = initialState.articleOp.error;
    })
    .addCase(getArticle.fulfilled, (state, action) => {
        state.articleOp.loading = initialState.articleOp.loading;
        state.articleOp.error = initialState.articleOp.error;
        state.articleOp.data = action.payload;
    })
    .addCase(getArticle.rejected, (state, action) => {
        state.articleOp.loading = initialState.articleOp.loading;
        debugger;
        // state.articleOp.error = ? 
    })
})

export { loadHome, fetchMenu, listArticles, getArticle };
export type { MenuEntry }
export type { FeaturedBlockType };
export default reducer;