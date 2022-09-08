import React from 'react';
import Icon from '../Icon';
import './index.scss';

interface ButtonProps {
    iconName?: string;
    onClick?: (arg: any) => void;
    disabled?: boolean;
    children?: string;
    type?: 'default' | 'primary' | 'text';
    shape?: 'default' | 'circle';
}
const Button = ( props: ButtonProps ) => {
    const { 
        iconName,
        onClick,
        disabled = false,
        children,
        type = 'default',
        shape = 'default-shape'
    } = props;

    let className = `btn btn-${type} btn-${shape}`;
    if ( disabled ) className = `${className} btn-disabled`;
    return(
        <div className={className}>
            { iconName && <Icon name={iconName}/>}
            { children }
        </div>
    )
}

export default Button;
