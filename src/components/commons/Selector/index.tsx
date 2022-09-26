import React from 'react';
import './index.scss';


interface SelectorProps {
    data: {
        label: string;
        value: string | number;
        selected?: boolean;
    }[];
    name: string;
    label?: string;
    onChange?: ( arg: {
        label: string;
        value: string | number;
        // selected?: boolean;
    } ) => void;
}
const Selector = (props: SelectorProps) => {
    const { data, name, label, onChange } = props;
    const [ selected, setSelected ] = React.useState< SelectorProps['data'][0]>(
        data.filter( el => el.selected )[0]
    )

    const dropdownRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect( () => {
        if ( selected && onChange ) {
            onChange(selected)
            // remove focus
            dropdownRef.current?.blur()
        };
    }, [selected]);

    return <>
        
        <div className="dropdown">
            { label && <label className="dropdown-label" htmlFor={name}>{label}</label>}
            <div tabIndex={0} className="dropdown-select anim-pulse" ref={dropdownRef}>
                <span>{ selected?.label || 'Select...'}</span>
                <div className="button"></div>
                <ul>
                    {data.map( (el, i) => <li 
                        key={i}
                        onClick={(e) => {setSelected(el)}}
                    >
                        {el.label}
                    </li>)}
                </ul>
            </div>
            
            <select name={name} defaultValue={selected?.value}>
                {data.map( (el, i) => <option 
                    key={i}
                    value={el.value}
                >
                        {el.label}
                </option>)}
            </select>
        </div>
    </>
}

export default Selector;