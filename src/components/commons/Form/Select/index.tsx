import React from 'react';
import './index.scss';

// Method to forcefully onChange event on Select elements
const triggerNativeEvent = ( el: HTMLSelectElement, value: string ) => {
    var trigger = Object.getOwnPropertyDescriptor(
        window.HTMLSelectElement.prototype,
        "value"
    )!.set;
    trigger!.call(el, value); // 4 is the select option's value we want to set
    var event = new Event("change", { bubbles: true });
    el.dispatchEvent(event);
}
    
type SelectOption = {
    label: string;
    value: string;
    selected?: boolean;
}
interface SelectProps {
    options: SelectOption[];
    name: string;
    label?: string;
    onChange?: ( arg: SelectOption ) => void;
}
const Select = (props: SelectProps) => {
    const { options, name, label, onChange } = props;
    const [ selected, setSelected ] = React.useState<SelectOption | undefined>(
        // TODO: Add warning or error when found more than an option with same value
        options.filter( el => el.selected )[0]
    );
    const selectRef = React.useRef<HTMLSelectElement | null>(null);

    const dropdownRef = React.useRef<HTMLDivElement | null>(null);

    const doSelection = React.useCallback( (el: {
        label: string;
        value: string;
        selected?: boolean;
    }) => {
        // Update hidden input (mirror)
        if (
            selectRef.current &&
            selectRef.current.value !== el.value
        ) {
            selectRef.current.value = el.value;
            // Update surface component
            el.selected = true;
            setSelected(el);
        };
        // Remove focus from surface component
        dropdownRef.current?.blur();
    }, [selectRef]);

    React.useEffect( () => {
        if ( selected && onChange ) {
            onChange(selected)
        };
    }, [selected, dropdownRef]);

    return <div className="dropdown">
        { label && <label className="dropdown-label" htmlFor={name}>{label}</label>}
        <div tabIndex={0} className="dropdown-select anim-pulse" ref={dropdownRef}>
            <span>{ selected?.label || 'Select...'}</span>
            <div className="button"></div>
            <ul>
                {options.map( (el, i) => <li 
                    key={i}
                    onClick={(e) => {doSelection(el)}}
                >
                    {el.label}
                </li>)}
            </ul>
        </div>
        
        <select
            ref={selectRef}
            name={name}
            defaultValue={selected?.value}
        >
            {options.map( (el, i) => <option 
                key={i}
                value={el.value}
            >
                    {el.label}
            </option>)}
        </select>
    </div>
        
}

export default Select;