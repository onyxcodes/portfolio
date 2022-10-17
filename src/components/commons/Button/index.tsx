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
    className?: string;
    name?: string;
}
const Button = ( props: ButtonProps ) => {
    const { 
        iconName,
        onClick,
        disabled = false,
        children,
        type = 'default',
        shape = 'default-shape',
        className,
        name
    } = props;

    let btnClass = `btn btn-${type} btn-${shape}`; 
    if ( className ) btnClass = `${btnClass} ${className}`;
    if ( disabled ) btnClass = `${btnClass} btn-disabled`;
    else btnClass = `${btnClass} anim-pulse`;
    
    return(
        <div
            role='button'
            data-testid={ name ? `button-${name}` : undefined}
            onClick={onClick}
            className={btnClass}
        >
            { iconName && <Icon name={iconName}/>}
            { children }
        </div>
    )
}

export default Button;
