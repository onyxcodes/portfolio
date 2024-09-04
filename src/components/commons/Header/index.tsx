import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { UIState } from 'features/ui';
import { StoreState } from 'store';
import Breadcrumb from 'components/commons/Breadcrumb';
import './index.scss';
import Icon from 'components/commons/Icon';
import { ActionBar } from 'alenite-design';

import "alenite-design/lib/styles/ActionBar.css";

interface HeaderProps {
    onTitleClick?: (arg: any) => void;
    title?: string;
}
const Header = forwardRef( (props: HeaderProps, ref: React.LegacyRef<HTMLDivElement>) => {
    const { onTitleClick, title } = props;
	const path = useSelector<StoreState, UIState['path']>( s => s.ui.path );

    let headerClass = 'header';

    if ( path !== '/' ) headerClass = `${headerClass} extended`;

    // return(<div ref={ref} className={headerClass}>
        <div
            className='header-title f aic'
            title={title}
            onClick={onTitleClick}
            style={{backgroundImage: `url(${require('assets/logo.svg')})`}}
        >
    //         <span className='menu-icon h3'><Icon name='bars' /></span>
    //         {/* TODO: add span for accessibility */}
    //     </div>
    //     <Breadcrumb />
    // </div>)
    return <ActionBar type='primary' position="top" items={[
        {
            item: <div
                className='header-title f aic'
                title={title}
                onClick={onTitleClick}
                style={{backgroundImage: `url(${require('assets/logo.svg')})`}}
            ></div>,
            title: 'logo',
            position: "center",
            key: 'logo',
            // alt: <Button shape='circle' iconName='search'/>
            // alt: <Button title='Search' shape='circle' iconName='search'/>
        },
        { item: <span>Home</span>, position: "left", key: 'menu-home' },
        { item: <span>Blog</span>, position: "left", key: 'menu-blog' },
        { item: <span>About</span>, position: "right", key: 'menu-about' },
        { item: <span>Contact</span>, position: "right", key: 'menu-contact' },
        // TODO
        // { item: <button>Favs</button>, position: "right", key: 'favorite-btn' }
    ]} />
})

export default Header