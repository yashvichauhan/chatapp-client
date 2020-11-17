import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux' ;
import {createStore,compose, combineReducers} from 'redux';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import App from './App';
import userReducer from './Store/user';
import chatReducer from './Store/chat'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer
});

const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
