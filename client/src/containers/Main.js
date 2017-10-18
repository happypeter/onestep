import React, { Component } from 'react'
import Home from '../components/Home/Home'
import WechatLogin from './WechatLoginContainer'
import Course from './CourseContainer'
import Episode from './EpisodeContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import store from '../redux/store'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
      store.getState().fakeAuth.isAuthenticated ? (
        <Component {...rest} />
      ) : (
        <Redirect to={{
          pathname: '/wechatLogin',
          state: { from: props.location }
        }} />
      )
    )
    } />
)

class Main extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/wechatLogin' component={WechatLogin} />
          <PrivateRoute path='/:courseName/:episodeName' component={Episode} />
          <Route path='/:courseName' component={Course} />
        </Switch>
      </Router>
    )
  }
}

export default Main
