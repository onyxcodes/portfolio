import React from 'react';
import {
	Routes,
    Route,
    useLocation,
    useNavigate
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSidebar from '../../components/Sidebar';
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

    // Sidebar wrapper and visibility fn
    const { sidebarWrapper, showSidebar } = useSidebar({
        logo: require('../../assets/logo.svg'),
        title: 'Onyx Ganda',
        menu: {
            links: [
                {
                    title: 'My link',
                    slug: 'my-link',
                    url: '#',
                    links: []
                },
                {
                    title: 'My nested link',
                    slug: 'my-nested-link',
                    url: '#',
                    links: [
                        {
                            title: 'Nice link',
                            slug: 'nice-link',
                            url: '#',
                        },
                        {
                            title: 'Another nice link',
                            slug: 'another-nice-link',
                            url: '#',
                        }
                    ]
                },
                {
                    title: 'My deep nested link',
                    slug: 'my-deep-nested-linl',
                    url: '#',
                    links: [
                        {
                            title: 'Tricky link',
                            slug: 'my-tricky-link',
                            url: '#',
                            links: [
                                {
                                    title: 'Surprise',
                                    slug: 'surprise',
                                    url: '#',
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    })

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
        <div className="header">
            <div 
                className='header-title' 
                onClick={() => showSidebar(true)}
                style={{backgroundImage: `url(${require('../../assets/logo.svg')})`}}
            >
                &nbsp;
            </div>
        </div>
        { sidebarWrapper }
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