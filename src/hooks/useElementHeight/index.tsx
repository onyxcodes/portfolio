import React from 'react';

/**
 * 
 * https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
 */
const useElementHeight = (element: HTMLElement | null) => {
	// save current element width in the state object
	const [height, setHeight] = React.useState(element?.clientHeight || 0);

	React.useEffect(() => {
		if (element) {
			// timeoutId for debounce mechanism
			let timeoutId: number;
			setHeight(element.clientHeight);
			const resizeListener = () => {
				// prevent execution of previous setTimeout
				window.clearTimeout(timeoutId);
				// trigger execution after 150 milliseconds
				timeoutId = window.setTimeout(() => {
					// change height only if it differs from current one
					if (element.clientHeight !== height) setHeight(element.clientHeight)
				}, 150);
			};
			// set resize listener
			window.addEventListener('resize', resizeListener);

			// clean up function
			return () => {
				// remove resize listener
				window.removeEventListener('resize', resizeListener);
			}
		}
	}, [element])

	// Tracks elemenet height also when changing in content size
	React.useEffect(() => {
		setHeight(element?.clientHeight || 0)
	}, [element?.clientHeight])

	return height;
}

export default useElementHeight;
