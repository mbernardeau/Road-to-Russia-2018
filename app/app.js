/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';
import createHistory from 'history/createBrowserHistory';

import 'sanitize.css/sanitize.css';
import 'expose-loader?Perf!react-addons-perf';

// Import root app
import App from 'containers/App';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './store';

// Import CSS reset and Global Styles
import './app.css';


import theme from './theme';

// Set moment locale for the whole app
moment.locale('fr');

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

injectTapEventPlugin();

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={theme}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
  );
};

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  const runtime = require('offline-plugin/runtime'); // eslint-disable-line global-require

  runtime.install({
    onUpdateReady: () => {
      // Tells to new SW to take control immediately
      runtime.applyUpdate();
    },
    onUpdated: () => {
      // Reload the webpage to load into the new version
      window.location.reload();
    },
  });
}

render();
