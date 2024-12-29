import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json'
import App from './component/App';
import {Provider} from 'react-redux';
import store from './component/redux/store';

const Appreducer = () =>(
    <Provider store={store}>
        <App/>
    </Provider>
);
AppRegistry.registerComponent(appName ,()=> Appreducer )
