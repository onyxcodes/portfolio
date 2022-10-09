import React from 'react';
import './index.scss';

// Method to forcefully onChange event on Select elements
const triggerNativeEvent = ( el: HTMLSelectElement ) => {
    var trigger = Object.getOwnPropertyDescriptor(
        window.HTMLSelectElement.prototype,
        "value"
    )!.set;
    trigger!.call(el, el.value); // 4 is the select option's value we want to set
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
        // TODO: Warning or error when found more than an option with same value
        options.filter( el => el.selected )[0]
    );
    const selectRef = React.useRef<HTMLSelectElement | null>(null);

    const dropdownRef = React.useRef<HTMLDivElement | null>(null);

    const mirrorSelection = React.useCallback( (el: {
        label: string;
        value: string;
        selected?: boolean;
    }) => {
        // Update surface component
        setSelected(el);
        // Update hidden input (mirror) and fire on change event
        if (
            selectRef.current &&
            // Checks whether value differs to avoid
            // firing event uselessly
            selectRef.current.value !== el.value
        ) {
            selectRef.current.value = el.value;
            triggerNativeEvent(selectRef.current);
        };
        // Remove focus from surface component
        dropdownRef.current?.blur();
    }, [selectRef]);

    const triggerOnChange = React.useCallback( (e: React.ChangeEvent<HTMLSelectElement>) => {
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
                    onClick={(e) => {mirrorSelection(el)}}
                >
                    {el.label}
                </li>)}
            </ul>
        </div>
        
        <select
            ref={selectRef}
            name={name}
            defaultValue={selected?.value}
            onChange={(e) => triggerOnChange(e)}
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