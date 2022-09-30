import React from 'react';
import './index.scss';
import ActionBar, { ActionBarItemProps } from 'components/commons/ActionBar';
import Page from './page';

interface ListProps {
    data: any[];
    pageSize: number;
    infiniteScroll?: boolean;
    headerItems?: ActionBarItemProps[];
    footerItems?: ActionBarItemProps[];
    listProcessor: (arg: any) => {
        processed?: any;
        elements: JSX.Element[]
    },
    onProcessEnd?: (arg: any) => void;
    // size?: 'm' | 'l';
    type?: 'list' | 'grid';
}
const List = ( props: ListProps ) => {
    const { 
        data, pageSize,
        infiniteScroll,
        type = 'list',
        headerItems, footerItems,
        listProcessor, onProcessEnd,
    } = props;

    const useInfinitePages = (
        list: any[],
        pageSize: number,
        listProcessor: (arg: any) => {
            processed?: any;
            elements: JSX.Element[]
        },
        onProcessEnd?: (arg: any) => void
    ) => {
        let pageNumber = Math.ceil(list.length / pageSize);
        let pages: JSX.Element[] = [];
        for ( var i = 0; i < pageNumber; i++ ) {
            let listSubset = list.slice( i * pageSize, i * pageSize + pageSize );
            let page = <Page key={i} list={listSubset} 
                listProcessor={listProcessor}
                onProcessEnd={onProcessEnd}
            />
            pages.push(page)
        }
        return pages
    }

    let listClass = `col-9 col-lg-12`;
    
    return <div className='list f p1 fd-col aic'>
        { headerItems && <ActionBar position="top"
            items={headerItems || []}
        /> }
        <div className={listClass}>
            <div className='columns jcc'>
                { infiniteScroll ? 
                    useInfinitePages(
                        data, pageSize,
                        listProcessor, 
                        onProcessEnd
                    ) :
                    <Page list={data} 
                        listProcessor={listProcessor}
                        onProcessEnd={onProcessEnd}
                    />
                }
            </div>
        </div>
        { footerItems && <ActionBar position="bottom"
            items={footerItems}
        /> }
    </div>
}

export default List;