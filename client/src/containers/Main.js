import React, { Component } from 'react'
import Home from '../components/Home/Home'
import WechatLogin from './WechatLoginContainer'
import Login from './LoginContainer'
import Course from './CourseContainer'
import Episode from './EpisodeContainer'
import Signup from './SignupContainer'
import Profile from './ProfileContainer'
import {requireAuthentication} from './CheckToken'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

class Main extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/wechatLogin' component={WechatLogin} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/profile' component={requireAuthentication(Profile)} />
          <Route path='/:courseName/:episodeName' component={requireAuthentication(Episode)} />
          <Route path='/:courseName' component={Course} />
        </Switch>
      </Router>
    )
  }
}

export default Main
