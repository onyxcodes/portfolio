import { createReducer } from '@reduxjs/toolkit';
import loadHome from './home';
import fetchMenu from './plugins/menu';
import getArticle, { listArticles } from './collections/article';
import getPage from './collections/page';
import { PaginationType } from './types';
import { ContentBlockType, ExpandingBlocksType, FileBlockType, TextBlockType, MediaTextType } from './components/types';
import { MenuEntryType } from './plugins/types';
import { ArticleType, PageType } from './collections/types';

export interface ContentState {
    menu: {
        main: {
            loading: boolean;
            error: any;
            data: MenuEntryType[] | null;
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
        featured: ContentBlockType[]
    },
    articlesOp: {
        loading: boolean;
        error: any;
        data: ArticleType[];
        meta: PaginationType | null;
    },
    articleOp: {
        loading: boolean;
        error: any;
        data: ArticleType | null
    },
    pageOp: {
        loading: boolean;
        error: any;
        data: PageType | null;
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
    },
    pageOp: {
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

    // fetch page
    .addCase(getPage.pending, (state, action) => {
        state.pageOp.loading = true;
        state.pageOp.data = initialState.pageOp.data;
        state.pageOp.error = initialState.pageOp.error;
    })
    .addCase(getPage.fulfilled, (state, action) => {
        state.pageOp.loading = initialState.pageOp.loading;
        state.pageOp.error = initialState.pageOp.error;
        state.pageOp.data = action.payload;
    })
    .addCase(getPage.rejected, (state, action) => {
        state.pageOp.loading = initialState.pageOp.loading;
        debugger;
        // state.articleOp.error = ? 
    })

})

export { loadHome, fetchMenu, listArticles, getArticle, getPage };
export type { MenuEntryType, ContentBlockType, ExpandingBlocksType, TextBlockType, FileBlockType, MediaTextType }
export type { ArticleType, PageType }
export default reducer;