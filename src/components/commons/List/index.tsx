import React from 'react';
import { ArticleType } from 'features/content/article';
import Card, { CardProps } from 'components/commons/Card'; 

interface ListProps {
    parent: string;
    data: ArticleType[];
    // size?: 'm' | 'l';
    type?: 'list' | 'grid';
}
const List = ( props: ListProps ) => {
    const { data, parent, type = 'list' } = props;

    const processGridData = (list: ArticleType[]) => list.map( el => {
        let cardConf: CardProps = {
            key: `${el.id}`,
            listName: parent,
            title: el.attributes.title,
            content: el.attributes.content,
            url: `${parent}/${el.attributes.slug}`,
            cover: el.attributes.cover.data && `${process.env.API_ENDPOINT}${el.attributes.cover.data.attributes.url}`
        };
        return <Card {...cardConf}/>
    });

    let listClass = `${type} col-9 col-lg-12`;
    
    return(<div className={listClass}>
        <div className='columns jcc'>
        {processGridData(data)}
        </div>
    </div>)
}

export default List;