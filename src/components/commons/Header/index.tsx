import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { UIState } from 'features/ui';
import { StoreState } from 'store';
import Breadcrumb from 'components/commons/Breadcrumb';
import './index.scss';
import Icon from 'components/commons/Icon';

interface HeaderProps {
    onTitleClick?: (arg: any) => void;
    title?: string;
}
const Header = forwardRef( (props: HeaderProps, ref: React.LegacyRef<HTMLDivElement>) => {
    const { onTitleClick, title } = props;
	const path = useSelector<StoreState, UIState['path']>( s => s.ui.path );

    let headerClass = 'header';

    if ( path !== '/' ) headerClass = `${headerClass} extended`;

    return(<div ref={ref} className={headerClass}>
        <div
            className='header-title f aic'
            title={title}
            onClick={onTitleClick}
            style={{backgroundImage: `url(${require('assets/logo.svg')})`}}
        >
            <span className='menu-icon h3'><Icon name='bars' /></span>
            {/* TODO: add span for accessibility */}
        </div>
        <Breadcrumb />
    </div>)
})

export default Header