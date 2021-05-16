import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Activate from './containers/Activate'
import ResetPassword from './containers/ResetPassword'
import ResetPasswordConfim from './containers/ResetPasswordConfirm'
import Layout from './hocs/Layout'

// bring it store
import { Provider } from 'react-redux'
import store from './store'

// alert
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Alerts from './components/Alerts'


const alertOptions = {
  timeout: 5000,
  position: 'top center',
}


function App() {
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} { ...alertOptions}>
      <Alerts />
        <Router>
          <Layout>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/activate/:uid/:token' component={Activate} />
              <Route exact path='/reset-password' component={ResetPassword} />
              <Route
                exact
                path='/password/reset/confirm/:uid/:token'
                component={ResetPasswordConfim}
              />
            </Switch>
          </Layout>
        </Router>
      </AlertProvider>
    </Provider>
  )
}

export default App
