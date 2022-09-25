import React from 'react';
import {
	Routes,
    Route,
    useLocation,
    useNavigate
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSidebar, { MenuLink } from 'components/Sidebar';
import { UIState, route } from 'features/ui';
import { StoreState } from 'store';
import logger from 'utils/logger';
import Loader from 'components/commons/Loader';

import { ContentState, fetchMenu, MenuEntryType } from 'features/content';

import Home from 'views/Home';
import Header from 'components/commons/Header';
import ArticleList from 'views/ArticleList';
import Article from 'views/Article';
import useLoader from 'components/useLoader';
import OnyxLogo from 'components/OnyxLogo';
import useElementHeight from 'components/commons/useElementHeight';
import NotFound from 'views/NotFound';
import Maintenance from 'views/Maintenance';
import Page from 'views/Page';

const App = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const path = useSelector<StoreState, UIState['path']>( s => s.ui.path );
	const isRouted = useSelector<StoreState, UIState['isRouted']>( s => s.ui.isRouted );
    const title = useSelector<StoreState, UIState['title']>( s => s.ui.title );

    const mainMenuReq = useSelector<StoreState, ContentState['menu']['main']>( s => s.content.menu.main );
    const [ mainMenu, setMainMenu ] = React.useState<MenuLink[]>([])
    const footerMenuReq = useSelector<StoreState, ContentState['menu']['footer']>( s => s.content.menu.footer );
    const isLoadingHome = useSelector<StoreState, ContentState['home']['loading']>( s => s.content.home.loading );

    const isViewLoading = useSelector<StoreState, UIState['loading']>( s => s.ui.loading );

    const isLoading = useLoader([mainMenuReq.loading, footerMenuReq.loading, isLoadingHome, isViewLoading]);

    const headerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect( () => {
        dispatch(fetchMenu('main'));
        // dispatch(fetchMenu('footer'));
    }, [dispatch]);

    const processMenuEntry = ( entry: MenuEntryType ) => {
        let links: MenuLink[] = [];
        if ( entry.attributes.children?.data &&
            entry.attributes.children?.data.length
        ) {
            links = entry.attributes.children.data.map( nestedEntry => processMenuEntry(nestedEntry))
        }
        return {
            title: entry.attributes.title,
            url: entry.attributes.url,
            slug: `${entry.id}`,
            links: links
        }
    }

    const processMenu = (menu: MenuEntryType[]): MenuLink[] => 
        menu.map( entry => processMenuEntry(entry))

    React.useEffect( () => {
        if (mainMenuReq.data) setMainMenu(processMenu(mainMenuReq.data))
    }, [mainMenuReq.data])

    // Sidebar wrapper and visibility fn
    const { sidebarWrapper, showSidebar } = useSidebar({
        logo: require('assets/logo.svg'),
        title: 'Onyx Ganda',
        menu: {
            links: mainMenu
        }
    })

    React.useEffect( ()=> {
        document.title =  `${title} - Onyx Ganda`
    }, [title]);

    const headerHeight = useElementHeight(headerRef?.current);

	React.useEffect( () => {
		if (location && location.pathname !== path ) { 
			dispatch(route(location.pathname));
			logger.debug({'location': location}, `Location changed but doesn't match path and "isRouted" flag is set to false. Routing to new location`);
		}
	}, [location]);

	React.useEffect( () => {
		if (path !== location?.pathname && isRouted) {
			navigate(path);
			logger.debug({'path': path}, `Path changed but doesn't match location and "isRouted" flag is set to true. Navigating to new path`);
		}
	}, [path]);

    return(
        <>
        <Loader element={<div className='loading-logo'>
            <OnyxLogo isAnimated/>
        </div>} show={isLoading}/>
        {/* <Loader id='view' element={<div className='loading-logo'>
            <OnyxLogo isAnimated/>
        </div>} show={isViewLoading}/> */}
        <Header ref={headerRef} title='Menu' onTitleClick={() => showSidebar(true)} />
        { sidebarWrapper }
        <main>
            <div className='header-doppelganger' style={{height: `${headerHeight}px`}}>&nbsp;</div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/article">
                    <Route path="" element={<ArticleList/>}/>
                    <Route path=":slug" element={<Article/>} />
                </Route>
                <Route path="/category" >
                    <Route path="" element={<Maintenance/>}/>
                    <Route path=":slug" element={<Maintenance/>} />
                </Route> 
                <Route path="/page" >
                    <Route path="" element={<Maintenance/>}/>
                    <Route path=":slug" element={<Page/>} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
        </>
    )
}

export default App;