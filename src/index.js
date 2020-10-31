import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './containers/app'
import {NotificationContainer} from 'react-notifications';
import 'sanitize.css/sanitize.css'
import './index.css'
import 'react-notifications/lib/notifications.css';

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
        <NotificationContainer />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
