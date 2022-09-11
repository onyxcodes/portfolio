import React from 'react';
import 'styles/icomoon.css';

interface IconProps {
    name: string
}
const Icon = ( props: IconProps ) => {
    const { name } = props;
    return(<i className={`icon-${name}`}>
    </i>)
}

export default Icon;