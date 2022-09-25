import React from 'react';

const useScrollDirection = ( 
    el: HTMLDivElement | null,
    initScroll: {
        value: number;
        direction: 'up' | 'down' | null
    },
    callback: ( arg: {
        value: number;
        direction: 'up' | 'down' | null
    } ) => void
) => {

    React.useEffect( () => {
        if (el) {
			let timeoutId: number;
            const scrollListener = (e: Event) => {
                // prevent execution of previous setTimeout
				window.clearTimeout(timeoutId);
                // trigger execution after 150 milliseconds
				timeoutId = window.setTimeout(() => {
                    const target = e.target as HTMLElement;
                    if ( e.target ) {
                        if ( initScroll.value > target.scrollTop ) {
                            callback({
                                value: target.scrollTop,
                                direction: 'up'
                            })
                        } else if ( initScroll.value < target.scrollTop ) {
                            callback({
                                value: target.scrollTop,
                                direction: 'down'
                            })
                        }
                    }
				}, 250);
            }
            el.addEventListener('scroll', scrollListener );

            // clean up function
			return () => {
				// remove listener
                el.removeEventListener('scroll', scrollListener );
			}
        }
    }, [el, initScroll]);
}

export default useScrollDirection;