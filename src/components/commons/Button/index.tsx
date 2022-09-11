import React from 'react';
import Icon from 'components/commons/Icon';
import './index.scss';

interface ButtonProps {
    iconName?: string;
    onClick?: (arg: any) => void;
    disabled?: boolean;
    children?: string;
    type?: 'default' | 'primary' | 'text';
    shape?: 'default' | 'circle';
    className?: string
}
const Button = ( props: ButtonProps ) => {
    const { 
        iconName,
        onClick,
        disabled = false,
        children,
        type = 'default',
        shape = 'default-shape',
        className
    } = props;

    let btnClass = className ? `${className} btn btn-${type} btn-${shape}` :
    `btn btn-${type} btn-${shape}`;
    if ( disabled ) btnClass = `${btnClass} btn-disabled`;
    return(
        <div onClick={onClick} className={btnClass}>
            { iconName && <Icon name={iconName}/>}
            { children }
        </div>
    )
}

export default Button;
