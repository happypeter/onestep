import React, { Component } from 'react'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Course from './components/Course/Course'
import Episode from './components/Episode/Episode'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import './assets/css/App.css'

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
      store.getState().fakeAuth.isAuthenticated ? (
        <Component {...rest} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
    )
    }/>
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/:courseName/:episodeName" component={Episode} />
              <Route path="/:courseName" component={Course} />
            </Switch>
          </Router>
        </div>
      </Provider>
    )
  }
}

export default App
