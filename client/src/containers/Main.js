import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import {requireAuthentication} from './CheckToken'
import asyncComponent from './AsyncComponent'

const AsyncHome = asyncComponent(() => import('../components/Home/Home'))
const AsyncLogin = asyncComponent(() => import('./LoginContainer'))
const AsyncCourse = asyncComponent(() => import('./CourseContainer'))
const AsyncSignup = asyncComponent(() => import('./SignupContainer'))
const AsyncEpisode = asyncComponent(() => import('./EpisodeContainer'))
const AsyncProfile = asyncComponent(() => import('./ProfileContainer'))
const AsyncWechatLogin = asyncComponent(() => import('./WechatLoginContainer'))

class Main extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={AsyncHome} />
          <Route path='/wechatLogin' component={AsyncWechatLogin} />
          <Route path='/login' component={AsyncLogin} />
          <Route path='/signup' component={AsyncSignup} />
          <Route path='/profile' component={requireAuthentication(AsyncProfile)} />
          <Route path='/:courseName/:episodeName' component={requireAuthentication(AsyncEpisode)} />
          <Route path='/:courseName' component={AsyncCourse} />
        </Switch>
      </Router>
    )
  }
}

export default Main
