import React from 'react';
import './index.scss';

interface SidemenuItemProps{
    onClick?: (arg: any) => void;
    children?: string;
}
const SidemenuItem = ( props: SidemenuItemProps ) => {
    const { onClick, children } = props;
    let itemClass = 'sidemenu-item';
    return(
        <div onClick={onClick} className={itemClass}>
            {/* { iconName && <Icon name={iconName}/>} */}
            { children }
        </div>
    )
}

export default SidemenuItem;