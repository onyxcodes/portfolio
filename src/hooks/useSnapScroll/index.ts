import React from 'react';
import useScrollDirection from 'hooks/useScrollDirection'

const useSnapScroll = (ref: HTMLDivElement | null) => {
    const [ scroll, setScroll ] = React.useState<{
        value: number;
        direction: 'up' | 'down' | null
    }>({
        value: 0,
        direction: null
    })
    const [ currentPageContentIndex, setCurrentPageContentIndex ] = React.useState(0);
    const [ skipScrollEvent, preventScrollTrack ] = React.useState(false);

    useScrollDirection(ref, scroll, setScroll);

    React.useEffect( () => {
        if ( scroll.direction && ref && !skipScrollEvent ) {
            let newIndex: number = currentPageContentIndex,
                contentLength: number = ref.childElementCount;

            if ( scroll.direction === 'up' && currentPageContentIndex - 1 > -1 )
                newIndex = currentPageContentIndex - 1;
            else if ( scroll.direction === 'down' && currentPageContentIndex + 1 < contentLength)
                newIndex = currentPageContentIndex + 1;
            preventScrollTrack(true);
            setCurrentPageContentIndex(newIndex);
        } else if ( scroll.direction && ref && skipScrollEvent ) preventScrollTrack(false);
    }, [scroll.value, scroll.direction]);

    React.useEffect( () => {
        if (ref) {
            var pageContent = ref.childNodes[currentPageContentIndex] as Element;
            pageContent.scrollIntoView({behavior: 'smooth'})
        }
    }, [currentPageContentIndex])

}

export default useSnapScroll;