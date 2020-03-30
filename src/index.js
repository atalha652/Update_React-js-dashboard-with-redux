import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';

import reducers from './reducers';
import AllRoutes from './components/routers/AllRoutes'


export const store = createStore(
    (reducers),
    composeWithDevTools(
        applyMiddleware(promise, thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <AllRoutes />
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
