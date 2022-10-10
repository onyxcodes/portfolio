import React from 'react';
import {
	Routes,
    Route,
    useLocation,
    useNavigate
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSidebar, { MenuLink } from 'components/custom/Sidebar';
import { UIState, route, loadNotifications } from 'features/ui';
import { StoreState } from 'store';
import logger from 'utils/logger';
import Loader from 'components/commons/Loader';

import { ContentState, fetchMenu, MenuEntryType } from 'features/content';

import NotificationArea from 'components/custom/NotificationArea';
import Header from 'components/commons/Header';

import useLoader from 'hooks/useLoader';
import OnyxLogo from 'components/custom/OnyxLogo';
import useElementHeight from 'hooks/useElementHeight';

const ArticleList = React.lazy(() => import('views/ArticleList'));
const Article = React.lazy(() => import('views/Article'));
const NotFound = React.lazy(() => import('views/NotFound'));
const Maintenance = React.lazy(() => import('views/Maintenance'));
const Page = React.lazy(() => import('views/Page'));

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
        // dispatch(loadNotifications([
        //     { id: 'pippo', message: 'This is just a test with a very small message', level: 'debug'},
        //     { id: 'pluto', message: 'Careful to not leave bug around!', level: 'warning', actions: [
        //         { label: 'OK', globalFnName: 'test'}
        //     ]},
        // ]))
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
			logger.debug({'location': location}, `Location changed. Routing to new location`);
		}
	}, [location]);

	React.useEffect( () => {
		if (path !== location?.pathname && isRouted) {
			navigate(path);
			logger.debug({'path': path}, `Path changed but doesn't match location and "isRouted" flag is set to true. Navigating to new path`);
		}
	}, [path]);

    const fullScreenLoader = <Loader element={<div className='loading-logo'>
        <OnyxLogo isAnimated/>
    </div>} show={isLoading}/>

    return(
        <>
        {fullScreenLoader}
        {/* <Loader id='view' element={<div className='loading-logo'>
            <OnyxLogo isAnimated/>
        </div>} show={isViewLoading}/> */}
        <Header ref={headerRef} title='Menu' onTitleClick={() => showSidebar(true)} />
        { sidebarWrapper }
        <main className='f fd-col' style={{
            marginTop: `${headerHeight}px`,
            height: `calc(100% - ${headerHeight}px)`
        }}>
            <Routes>
                <Route path="/" element={<React.Suspense fallback={fullScreenLoader}>
                    <Page forcedSlug='home'/>
                </React.Suspense>} />
                <Route path="/article">
                    <Route path="" element={<React.Suspense fallback={fullScreenLoader}>
                        <ArticleList/>
                    </React.Suspense>}/>
                    <Route path=":slug" element={<React.Suspense fallback={fullScreenLoader}>
                        <Article/>
                    </React.Suspense>} />
                </Route>
                <Route path="/category" >
                    <Route path="" element={<React.Suspense fallback={fullScreenLoader}>
                        <Maintenance/>
                    </React.Suspense>}/>
                    <Route path=":slug" element={<React.Suspense fallback={fullScreenLoader}>
                        <Maintenance/>
                    </React.Suspense>} />
                </Route> 
                <Route path="/page" >
                    <Route path="" element={<React.Suspense fallback={fullScreenLoader}>
                        <NotFound/>
                    </React.Suspense>}/>
                    <Route path=":slug" element={<React.Suspense fallback={fullScreenLoader}>
                        <Page/>
                    </React.Suspense>} />
                </Route>
                <Route path="*" element={<React.Suspense fallback={fullScreenLoader}>
                    <NotFound />
                </React.Suspense>} />
            </Routes>
        </main>
        <NotificationArea />
        </>
    )
}

export default App;