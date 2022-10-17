import React, { ReactNode } from 'react';
import {
    useLocation,
} from 'react-router-dom';

// TODO: Extract logics related to links and router
// Should be able to accomplish that with a custom hook

interface HeadingProps {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    id?: string;
    children: ReactNode;
    className?: string;
}
const Heading = ( props: HeadingProps ) => {
    const { level, children, id , className } = props;
	const location = useLocation();
    const headingRef = React.useRef<HTMLHeadingElement | null>(null);
    const [ registeredListener, markRegisteredListener ] = React.useState(false);

    let element: JSX.Element;

    React.useEffect( () => {
        // Checks whether the URL's hash points to this heading
        if (location.hash === `#${id}`) {
            let heading = headingRef.current;
            // Smoothly scrolls into view the heading
            if (heading) {
                // Will trigger once at first change of hash
                heading.scrollIntoView({behavior: 'smooth'});
                // Toggle a listener to enable repeated clicks on anchor
                // that will smooth scroll the heading even when the location's
                // hash remain the same
                if (!registeredListener) {
                    let anchor = heading.querySelector(`a[href="#${id}"]`);
                    const scrollHeadingintoView = (e: Event) => {
                        heading?.scrollIntoView({behavior: 'smooth'});
                    }
                    anchor?.addEventListener('click', scrollHeadingintoView );
                    // Marks the registration to avoid multiple listeners
                    markRegisteredListener(true);
                }
            }
        }
    }, [location, headingRef]);

    switch (level) {
        case 1:
            element = <h1>{children}</h1>;
        break;
        case 2:
            element = <h2>{children}</h2>;
        break;
        case 3:
            element = <h3>{children}</h3>;
        break;
        case 4:
            element = <h4>{children}</h4>;
        break;
        case 5:
            element = <h5>{children}</h5>;
        break;
        case 6:
            element = <h6>{children}</h6>;
        break;
    }

    return <element.type 
        data-testid={ id ? `heading-${id}` : undefined}
        className={className}
        ref={headingRef}
        key={element.key}
        {...element.props}
    />;
}

export default Heading;