import React from 'react';
import Link from 'components/commons/Link';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';

import './index.scss';

interface BreadcrumbProps {
    showHome?: boolean
}


const keywords: {
    [key: string]: string | JSX.Element;
} = {
    'home': '',
    'article': 'Articles',
    'category': 'Categories'
}
const pathToBreadcrumb = ( path: string, title: string ) => {
    // split into string the path, skip empty
    const pathParts = path.split('/').filter( i => i);
    let links: string[] = [];
    let elements: JSX.Element[] = [];
    for ( var i = 0; i < pathParts.length; i++) {
        const pathPart = pathParts[i];
        let link: string = pathPart;
        link = links[links.length-1] ? `${links[links.length-1]}/`.concat(link) : `/${link}`;
        links.push(link);
        let elementKey = links[links.length-1],
            elementText = keywords.hasOwnProperty(pathPart) ? keywords[pathPart] : title, 
            // elementText = keywords.hasOwnProperty(pathPart) ? keywords[pathPart] : pathPart, 
            element = <li className="breadcrumb-item h4" key={elementKey}>
                <Link to={link}>{elementText}</Link>
            </li>
        elements.push(element);
    }
    return elements;
}

const Breadcrumb = (props: BreadcrumbProps) => {
    const { showHome = false } = props;
    const path = useSelector<StoreState, StoreState['ui']['path']>(s => s.ui.path);
    const title = useSelector<StoreState, StoreState['ui']['title']>(s => s.ui.title);
    const homeBreadcrumb = <li key='home'>
        <Link to='/'>{keywords['home']}</Link>
    </li>
    const breadcrumbs = React.useMemo( () => pathToBreadcrumb(path, title), [path, title]);
    const allBreadcrumbs = showHome ? [ homeBreadcrumb, ...breadcrumbs] : breadcrumbs
    return allBreadcrumbs.length ? 
        <ul className='breadcrumb'>
            {allBreadcrumbs}
        </ul> : <></>;
};

export default Breadcrumb;