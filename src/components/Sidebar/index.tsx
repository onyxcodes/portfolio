import React, { useState } from 'react';
import './index.scss';
import StatefulLink from '../commons/StatefulLink';
import Icon from '../commons/Icon';
import Button from '../commons/Button';

type MenuLink = {
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
            { isHeading && <StatefulLink to={childlink?.url || link.url}>
                <Button iconName='angle-double-right' shape='circle'/>
            </StatefulLink>}
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
    const [ delayedVisiblity, setDelayedVisiblity ] = useState(visible);

    const renderMenu = ( menu: Menu ) => menu.links.map((link, index) => {
        const renderSubLinks = ( menuLinks: MenuLink[] ) => menuLinks.map((sublink, subindex) => {
            return (
                <li className='menu-item-container' key={subindex}>
                    <StatefulLink to={sublink.url}>
                        <Button>
                            {sublink.title}
                        </Button>
                    </StatefulLink>
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
                        <ul>
                            {renderSubLinks(childlink.links)}
                        </ul>
                    </div> </li>)
            } else {
                return (<li className='menu-item-container' key={childindex}>
                    <StatefulLink to={childlink.url}>
                        <Button>
                                {childlink.title}
                        </Button>
                    </StatefulLink>
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
                        <ul>
                            {renderChildLinks(link.links)}
                        </ul>
                    </div>
                </li>
            )
        } else {
            return (
                <li className='menu-item-container' key={index}>
                    <StatefulLink to={link.url}>
                        <Button>{link.title}</Button>
                    </StatefulLink>
                </li>
            )
        }
    });

    const renderedMenu = menu && renderMenu(menu);

    React.useLayoutEffect( () => {
        setTimeout( () => setDelayedVisiblity(visible), 250)
    }, [visible]);

    let menuClassName = "sidebar";
    let maskClassName = 'sidebar-mask';
    
    if ( delayedVisiblity ) {
        menuClassName = `${menuClassName} visible`;
        maskClassName = `${maskClassName} visible`;
    }

    const wrapper = visible && <>
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
            { menu && <ul className="menu">
                {renderedMenu}
            </ul> }
        </div>
        { visible && 
        <div className={maskClassName} onClick={() => show(false)}>
            
        </div>}
    </>

    return {
        sidebarWrapper: wrapper,
        showSidebar: show
    }
}

export default useSidebar;