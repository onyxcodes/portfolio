import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'store';
import App from 'views/App';
import 'styles/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import 'utils/gtag';


const container = document.getElementById('root');
const root = createRoot(container!); 
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <div id="app">
                <Router><App/></Router>
            </div>
        </Provider>
    </React.StrictMode>
);
