import React from 'react';
import './index.scss';

interface LogoProps {
    isAnimated?: boolean;
}
const OnyxLogo = (props: LogoProps) => {
    const { isAnimated = false } = props;
    let logoClass = 'onyx';
    if (isAnimated) logoClass = `${logoClass} animated`;
    return <svg className={logoClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 785.06 151.36">
        <g id="layer" data-name="Layer 8">
            <path className="onyx-path onyx-o" d="M76.2 19.1c31.5 0 57.1 25.4 57.1 56.6s-25.6 56.6 -57.1 56.6S19.1 106.9 19.1 75.7S44.7 19.1 76.2 19.1M76.2 0C34.1 0 0 33.9 0 75.7s34.1 75.7 76.2 75.7s76.2 -33.9 76.2 -75.7S118.2 0 76.2 0z" />
            <path className="onyx-n onyx-path" d="M342.4 22.4v66.2L275.8 22.4h66.6M234.9 62.8l66.6 66.2h-66.6V62.8M346.2 3.8H231.1a14.8 14.8 0 0 0 -14.8 14.8v114.2a14.8 14.8 0 0 0 14.8 14.8h115.1A14.8 14.8 0 0 0 361 132.8V18.6A14.8 14.8 0 0 0 346.2 3.8zM332.2 129.2a10.2 10.2 0 0 1 -7.2 -3l-89.5 -89a10.2 10.2 0 0 1 14.4 -14.5l89.5 89a10.2 10.2 0 0 1 -7.2 17.4z" />
            <g className='onyx-y'>
                <line className="onyx-line" x1="500.75" y1="134.94" x2="500.75" y2="55.03" />
                <line className="onyx-line" x1="500.75" y1="55.03" x2="437.03" y2="16.15" />
                <line className="onyx-line" x1="500.75" y1="55.03" x2="569.86" y2="19.39" />
                <path className="onyx-path" d="M559.8 19.9l-58.6 105.8L442.5 19.9h117.3M569 3.6H433.3a10.9 10.9 0 0 0 -9.5 16.1l67.8 122.4a10.9 10.9 0 0 0 19 0L578.5 19.8A10.9 10.9 0 0 0 569 3.6z" />
            </g>
            <g className='onyx-x'>
                <line className="onyx-line" x1="651.15" y1="137.77" x2="776.1" y2="13.6" />
                <line className="onyx-line" x1="776.1" y1="137.77" x2="651.15" y2="13.6" />
            </g>
        </g>
    </svg>
}

export default OnyxLogo;