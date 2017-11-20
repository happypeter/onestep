import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import {requireAuthentication} from './CheckToken'
import Loadable from 'react-loadable'
import LoadingComponent from './LoadingComponent'

const AsyncHome = Loadable({
  loader: () => import('../components/Home/Home'),
  loading: LoadingComponent
})
const AsyncSignup = Loadable({
  loader: () => import('./SignupContainer'),
  loading: LoadingComponent
})
const AsyncLogin = Loadable({
  loader: () => import('./LoginContainer'),
  loading: LoadingComponent
})
const AsyncWechatLogin = Loadable({
  loader: () => import('./WechatLoginContainer'),
  loading: LoadingComponent
})
const AsyncProfile = Loadable({
  loader: () => import('./ProfileContainer'),
  loading: LoadingComponent
})
const AsyncCourse = Loadable({
  loader: () => import('./CourseContainer'),
  loading: LoadingComponent
})
const AsyncEpisode = Loadable({
  loader: () => import('./EpisodeContainer'),
  loading: LoadingComponent
})

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
