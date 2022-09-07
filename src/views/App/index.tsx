import React from 'react';
import {
	Routes,
    Route,
    useLocation,
    useNavigate
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainMenu from '../../components/MainMenu';
import { UIState, route } from '../../features/ui';
import { StoreState } from '../../store';
import logger from '../../utils/logger';
import Loader from '../../components/commons/Loader';

const App = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const path = useSelector<StoreState, UIState['path']>( s => s.ui.path );
	const isRouted = useSelector<StoreState, UIState['isRouted']>( s => s.ui.isRouted );
    const [ isTestLoading, showTestLoading ] = React.useState(true);

	React.useEffect( () => {
		if (location && !isRouted && location.pathname !== path ) { 
			dispatch(route(location.pathname));
			logger.info({'location': location}, `Location changed but doesn't match path and "isRouted" flag is set to false. Routing to new location`);
		}
	}, [location]);

	React.useEffect( () => {
		if (path !== location?.pathname && isRouted) {
			navigate(path);
			logger.info({'path': path}, `Path changed but doesn't match location and "isRouted" flag is set to true. Navigating to new path`);
		}
	}, [path]);

    React.useEffect( () => {
        window.setTimeout( () => showTestLoading(false), 5000 )
    })
    return(
        <>
        <Loader show={isTestLoading}/>
        <MainMenu /> 
        <Routes>
            <Route path="/" element={<>Home</>} />
            <Route path="/article" element={<>List of articles</>}>
                <Route path=":article" element={<>Specific article</>} />
            </Route>
            <Route path="/category" element={<>Categories</>} >
                <Route path=":category" element={<>Specific category</>} />
            </Route> 
            <Route path="/page">
            {/* <Route path="/page" element={<>Pages?</>} > */}
                <Route path=":page" element={<>Specific page</>} />
            </Route>  
        </Routes>
        </>
    )
}

export default App;