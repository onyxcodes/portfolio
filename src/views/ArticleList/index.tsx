import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from 'components/commons/List';
import { ContentState, listArticles, resetArticles } from 'features/content';
import { StoreState } from 'store';
import './index.scss';
import { getStrapiMedia } from 'utils/strapi';
import { ArticleType } from 'features/content';
import Card, { CardProps } from 'components/commons/Card';
import Button from 'components/commons/Button';
import Select from 'components/commons/Form/Select';
import { setLoading, setTitle } from 'features/ui';

interface ArticleListProps {
    //
}
const ArticleList = ( props: ArticleListProps ) => {
    const dispatch = useDispatch();

    const [ list, setList ] = React.useState<ArticleType[]>([]);
    const [ page, setPage ] = React.useState(1);
    const [ pageSize, setPageSize ] = React.useState(24);
    const [ pagination, setPagination ] = React.useState<'paged' | 'scroll'>('paged');
    const [ sorting, setSorting ] = React.useState('publishedAt:desc')

    const listArticlesOp = useSelector<StoreState, ContentState['articlesOp']>( s => s.content.articlesOp );

    /* When pagination mode is paged, the list that will be passed to the List component
     * is limited to the current page scope. 
     * Alternatively the whole data stored in state, will be passed to the component to
     * be handled as infinite scroll 
     */
    React.useEffect( () => {
        if ( pagination === 'paged' ) {
            let offset = (page - 1) * pageSize;
            let endOffset = offset + pageSize;
            setList(listArticlesOp.data.slice( (page - 1) * pageSize, endOffset ))
        } else setList(listArticlesOp.data)
    }, [page, pageSize, listArticlesOp.data, pagination]);

    /* Flag evaluated to true when the current page number
     * is less than the page count
     */
    const hasNext = ( listArticlesOp.meta?.page && listArticlesOp.meta?.pageCount ) ? 
        listArticlesOp.meta?.page < listArticlesOp.meta?.pageCount :
        false;

    /* Flag evaluated to true when the current page number
     * is heigher than 1
     */
    const hasPrevious = ( listArticlesOp.meta?.page ) ? 
        listArticlesOp.meta?.page > 1 : false;

    // Sets the title to Articles
    React.useEffect( () => {
        dispatch(setTitle('Articles'));
    }, [dispatch])

    // Requests articles when the page or the page size changes
    React.useEffect( () => {
        dispatch(listArticles({
            page: page,
            pageSize: pageSize,
            sort: sorting
        }))
    }, [page, pageSize, sorting]);

    React.useEffect( () => {
        dispatch(setLoading(listArticlesOp.loading));
    }, [listArticlesOp.loading]);

    /* The first argument of the function and the returned object
     * have to be aligned to the ones expected from the List's 
     * 'listProcessor' property
     */
    const processGridData = ( list: any[] ) => React.useMemo( () => {
        return {
            /* Optional parameter 'processed', expected by List's 'listProcessor' property
             * is not needed because the 'processEnd' callback is not used 
             */
            elements: list.map( el => {
                let cardConf: CardProps = {
                    key: `${el.id}`,
                    listName: '/article', // Consider using useParams instead of this prop
                    title: el.attributes.title,
                    content: el.attributes.description,
                    url: `/article/${el.attributes.slug}`,
                    cover: el.attributes.cover.data && getStrapiMedia(el.attributes.cover.data).url
                };
                return <Card {...cardConf}/>
            })
        }
        
    }, [list]);

    const fetchNext = () => {
        if (hasNext) {
            setPage( page + 1 );
        }
    };

    const fetchPrevious = () => {
        if (hasPrevious) {
            setPage( page - 1 );
        }
    };

    const doSetSort = (value: string) => {
        setSorting(value)
        setPage(1)
        dispatch(resetArticles())
    }

    return(<div className='article-list'>
        <List
            data={list}
            pageSize={pageSize}
            listProcessor={(_list) => processGridData(_list)}
            headerItems={[
                { item: <Select 
                    name='pagination' label='Pagination'
                    options={[
                        { label: 'Paged', value: 'paged', selected: true },
                        { label: 'Scroll', value: 'scroll' },
                    ]}
                    onChange={ (selected) => ( selected.value === 'paged' || selected.value === 'scroll' ) && setPagination(selected.value)}
                />, position: 'left'},
                { item: <Select 
                    name='sorting' label='Sort by'
                    options={[
                        { label: 'Newer', value: 'publishedAt:desc', selected: true },
                        { label: 'Older', value: 'publishedAt:asc' },
                    ]}
                    onChange={ (selected) => typeof selected.value === 'string' && doSetSort(selected.value)}
                />, position: 'left'}
            ]}
            footerItems={ pagination === 'paged' ? [
                { item: <Button type='primary' onClick={() => fetchPrevious()} disabled={!hasPrevious}>Previous</Button>, position: "left"},
                { item: <span>{`Page ${page}`}</span>, position: "center"},
                { item: <Button type='primary' onClick={() => fetchNext()} disabled={!hasNext}>Next</Button>, position: "right"}
            ]: [{ item: <Button type='primary' onClick={() => fetchNext()} disabled={!hasNext}>More</Button>, position: "center"}]}
        />
    </div>)
}

export default ArticleList