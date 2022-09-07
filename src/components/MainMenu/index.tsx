import React, { useState } from 'react';
import './index.scss';
import StatefulLink from '../commons/StatefulLink';

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
const MenuItem = ( props: MenuItemProps) => {
    const { 
        link,
        childlink, 
        isHeading = false,
    } = props;
    let itemId: string,
        itemName: string,
        labelClass: string = isHeading ? 'menuItemHeading' : 'menuItem';

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
            <input type="radio" id={itemId} name={itemName} hidden />
            <label htmlFor={itemId} className={labelClass}>
                {childlink?.title || link.title}
            </label>
            { isHeading && <StatefulLink to={childlink?.url || link.url}>
                <span>⇢</span>
            </StatefulLink>}
        </>
    )
}

const MainMenu = () => {
    const [ menuVisible, showMenu ] = useState(false);
    const fakeMenu: Menu = {
        links: [
            {
                title: 'My link',
                slug: 'my-link',
                url: '#',
                links: []
            },
            {
                title: 'My nested link',
                slug: 'my-nested-link',
                url: '#',
                links: [
                    {
                        title: 'Nice link',
                        slug: 'nice-link',
                        url: '#',
                    },
                    {
                        title: 'Another nice link',
                        slug: 'another-nice-link',
                        url: '#',
                    }
                ]
            },
            {
                title: 'My deep nested link',
                slug: 'my-deep-nested-linl',
                url: '#',
                links: [
                    {
                        title: 'Tricky link',
                        slug: 'my-tricky-link',
                        url: '#',
                        links: [
                            {
                                title: 'Surprise',
                                slug: 'surprise',
                                url: '#',
                            }
                        ]
                    }
                ]
            }
        ]
    }

    const renderMenu = ( menu: Menu ) => menu.links.map((link, index) => {
        const renderSubLinks = ( menuLinks: MenuLink[] ) => menuLinks.map((sublink, subindex) => {
            return (
                <li>
                    <StatefulLink to={sublink.url}>
                        <span>
                            {sublink.title}
                        </span>
                    </StatefulLink>
                </li>
            )
        });
        const renderChildLinks = ( menuLinks: MenuLink[] ) => menuLinks.map((childlink, childindex) => {
            {/* Checks if there are more sublinks */ }
            if (childlink.links && childlink.links.length) {
                return (<li>
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
                return (<li>
                    <StatefulLink to={childlink.url}>
                        <span>
                                {childlink.title}
                        </span>
                    </StatefulLink>
                </li>)
            }
        });
        
        if (link.links && link.links.length) {
            return (
                <li className="panel">
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
                <li>
                    <StatefulLink to={link.url}>
                        <span className='menuItem'>{link.title}</span>
                    </StatefulLink>
                </li>
            )
        }
    });
    const menuClassName = menuVisible ? "visible" : "";
    return (
        <div className='mainMenu'>
            <div className="header">
                <span onClick={() => showMenu(true)}>
                    Portfolio
                </span>
            </div>
            <div className={menuClassName}  id='sidebar'>
                <div>
                    <span onClick={() => showMenu(false)}>X</span>
                </div>
                <ul className="menu">
                    {renderMenu(fakeMenu)}
                </ul>
            </div>
        </div>
    )
}

export default MainMenu;