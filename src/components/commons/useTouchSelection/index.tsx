import React from 'react';

/**
 * @description Helper hook that can be used to track touch (or clicks) on an element. 
 * Returns an element which may be used for css selectors, like adiacent or general sibling combinators.
 * @param className Class of the input element, should be used for css sibling selector
 * @param name Required to group inputs by name
 */
const useTouchSelection = ( className: string, name: string) => {
    const touchSelector = React.useRef<HTMLInputElement>(null);

    const touchHandler = React.useCallback( () => {
        if (touchSelector && touchSelector.current) {
            touchSelector.current.checked = true
            console.log('Checked an item')
        }
    }, [touchSelector]);

            
    const TouchSelector = () => <input className={className} ref={touchSelector} type='radio' name={name} readOnly hidden/>

    return {
        TouchSelector,
        touchHandler
    }
}

export default useTouchSelection;