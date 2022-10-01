import React from 'react';

const allFalse = ( boolList: boolean[] ) => {
    let result = true;
    for ( const boolValue of boolList ) {
        if ( boolValue ) return false;
    }
    return result;
}

const anyTrue = ( boolList: boolean[] ) => {
    let result = false;
    for ( const boolValue of boolList ) {
        if ( boolValue ) return true;
    }
    return result; 
}

const useLoader = (
    dependency: boolean[],
) => {
    const [ isLoading, setLoading ] = React.useState(false);
    React.useEffect( () => {
        let timeout: number = 0;
        if ( isLoading && allFalse(dependency) ) {
            if ( timeout ) window.clearTimeout(timeout);
            timeout = window.setTimeout( () => {
                setLoading(false);
            }, 150 )
        }
        else if ( !isLoading && anyTrue(dependency)) setLoading(true);
        return () => {
            window.clearTimeout(timeout);
        }
    }, [isLoading, ...dependency]);

    return isLoading;
}

export default useLoader;