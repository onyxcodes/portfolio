import React, { useState } from 'react';
import './index.scss';
import Link from 'components/commons/Link';
import SidemenuItem from 'components/commons/SidemenuItem';
import Button from 'components/commons/Button';

export type MenuLink = {
    title: string;
    slug: string;
    url: string;
    links?: MenuLink[]
}
type Menu = {
    links: MenuLink[]
}

interface MenuItemProps {
    link: MenuLink;
    childlink?: MenuLink;
    isHeading?: boolean;
}
const MenuItem = ( props: MenuItemProps ) => {
    const { 
        link,
        childlink, 
        isHeading = false,
    } = props;
    let itemId: string,
        itemName: string;

    if (!childlink) {
            itemId = `panel-${link.slug}`;
            itemName = 'panel-radio';
            if (isHeading) {
                itemId = `panelx-${link.slug}`;
            }
    } else {
            itemName = 'panelx-radio';
            itemId = `panelx-${link.slug}-${childlink.slug}`;
            if (isHeading) {
                itemId = `panelxx-${link.slug}-${childlink.slug}`;
            }
    }
    return(
        <>
            <input className='menuItemValue' type="radio" id={itemId} name={itemName} hidden />
            <label htmlFor={itemId}>
                <Button 
                    iconName={ isHeading ? 'angle-down' : undefined }
                    type={ isHeading ? 'text' : undefined }
                >
                    {childlink?.title || link.title}
                </Button>
            </label>
            { isHeading && <Link to={childlink?.url || link.url}>
                <Button iconName='angle-double-right' shape='circle'/>
            </Link>}
        </>
    )
}

interface SidebarProps {
    menu?: Menu;
    title: string;
    logo?: string;
}
const useSidebar = ( props: SidebarProps ) => {
    const { menu, title, logo } = props;
    const [ visible, show ] = useState(false);
    const [ wrapperMounted, mountWrapper ] = useState(false);
    const [ visibility, setVisibility ] = useState(false);

    const renderMenu = ( menu: Menu ) => menu.links.map((link, index) => {
        const renderSubLinks = ( menuLinks: MenuLink[] ) => menuLinks.map((sublink, subindex) => {
            return (
                <li className='menu-item-container' key={subindex}>
                    <Link to={sublink.url}>
                        <SidemenuItem onClick={() => show(false)}>
                            {sublink.title}
                        </SidemenuItem>
                    </Link>
                </li>
            )
        });
        const renderChildLinks = ( menuLinks: MenuLink[] ) => menuLinks.map((childlink, childindex) => {
            {/* Checks if there are more sublinks */ }
            if (childlink.links && childlink.links.length) {
                return (<li className='menu-item-container' key={childindex}>
                    <MenuItem link={link} childlink={childlink} />
                    <div className="panel-body">
                        <div className="panel-header">
                            <MenuItem link={link} childlink={childlink} isHeading/>
                        </div>
                        <ul className='no-list'>
                            {renderSubLinks(childlink.links)}
                        </ul>
                    </div> </li>)
            } else {
                return (<li className='menu-item-container' key={childindex}>
                    <Link to={childlink.url}>
                        <SidemenuItem onClick={() => show(false)}>
                                {childlink.title}
                        </SidemenuItem>
                    </Link>
                </li>)
            }
        });
        
        if (link.links && link.links.length) {
            return (
                <li className="panel menu-item-container" key={index}>
                    <MenuItem link={link} />
                    <div className="panel-body">
                        <div className="panel-header">
                            <MenuItem link={link} isHeading />
                        </div>
                        <ul className='no-list'>
                            {renderChildLinks(link.links)}
                        </ul>
                    </div>
                </li>
            )
        } else {
            return (
                <li className='menu-item-container text-uppercase' key={index}>
                    <Link to={link.url}>
                        <SidemenuItem onClick={() => show(false)}>{link.title}</SidemenuItem>
                    </Link>
                </li>
            )
        }
    });

    const renderedMenu = menu && renderMenu(menu);

    let menuClassName = "sidebar fd-col text-nosel";
    let maskClassName = 'sidebar-mask';

    React.useLayoutEffect( () => {
        let unmountTimeoutId: number,
            visiblityTimeoutId: number;
        if ( visible ) {
            mountWrapper(visible);
            visiblityTimeoutId = window.setTimeout(() =>  setVisibility(visible),250);
        } else {
            unmountTimeoutId = window.setTimeout( () => mountWrapper(visible), 1000);
            setVisibility(visible);
        }
        return () => {
            unmountTimeoutId && window.clearTimeout(unmountTimeoutId);
            visiblityTimeoutId && window.clearTimeout(visiblityTimeoutId);
        }
    }, [visible]);
    
    if ( visibility ) {
        menuClassName = `${menuClassName} visible`;
        maskClassName = `${maskClassName} visible`;
    }

    const wrapper = wrapperMounted && <>
        <div className={menuClassName}>
            <div className="sidebar-header">
                <div 
                    className='header-title'
                    title={title}
                    style={{backgroundImage: logo && `url(${logo})`}}
                >
                    &nbsp;
                </div>
            </div>
            { menu && <ul className="menu no-list">
                {renderedMenu}
            </ul> }
        </div>
        <div className={maskClassName} onClick={() => show(false)}>
            
        </div>
    </>

    return {
        sidebarWrapper: wrapper,
        showSidebar: show
    }
}

export default useSidebar;