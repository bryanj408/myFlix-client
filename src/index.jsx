import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { Container } from 'react-bootstrap';
import { legacy_createStore as createStore} from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import MainView from './components/main-view/main-view';
=======
import Container from 'react-bootstrap/Container';
import { MainView } from './components/main-view/main-view';
>>>>>>> gh-pages

import './index.scss';

//Store
const store = createStore(moviesApp, devToolsEnhancer());

//Main component
class MyFlixApplication extends React.Component {
    render() {
        return (
<<<<<<< HEAD
            <Provider store={store}>
                <Container>
                    <MainView />
                </Container>
            </Provider>
=======
            <Container>
                <MainView />
            </Container>

>>>>>>> gh-pages
        );
    }
}

//Finds root of app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render app in root of DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);