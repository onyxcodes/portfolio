import React from 'react';
import { ArticleType } from 'features/content';
import Card, { CardProps } from 'components/commons/Card'; 
import { getStrapiMedia } from 'utils/strapi';

interface ListProps {
    parent: string;
    data: ArticleType[];
    // size?: 'm' | 'l';
    type?: 'list' | 'grid';
}
const List = ( props: ListProps ) => {
    const { data, parent, type = 'list' } = props;

    const processGridData = ( list: ArticleType[] ) => list.map( el => {
        let cardConf: CardProps = {
            key: `${el.id}`,
            listName: parent,
            title: el.attributes.title,
            content: el.attributes.content,
            url: `${parent}/${el.attributes.slug}`,
            cover: el.attributes.cover.data && getStrapiMedia(el.attributes.cover.data).url
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