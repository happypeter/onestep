import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router'
import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'
import ProfileSettings from './ProfileSettingsContainer'
import WeChatCallbackContainer from './WeChatCallbackContainer'
import ResetPasswordContainer from './ResetPasswordContainer'
import { PrivateRoute, history } from '../utils/routerUtils'
import withMui from '../utils/withMui'
import Layout from '../containers/LayoutContainer'

const AsyncHome = Loadable({
  loader: () => import('../components/Home/Home'),
  loading: LoadingComponent,
  delay: 300
})

const AsyncSignup = Loadable({
  loader: () => import('./SignupContainer'),
  loading: LoadingComponent,
  delay: 300
})

const AsyncLogin = Loadable({
  loader: () => import('./LoginContainer'),
  loading: LoadingComponent,
  delay: 300
})

const AsyncProfile = Loadable({
  loader: () => import('./ProfileContainer'),
  loading: LoadingComponent,
  delay: 300
})

const AsyncCourse = Loadable({
  loader: () => import('./CourseContainer'),
  loading: LoadingComponent,
  delay: 300
})

const AsyncEpisode = Loadable({
  loader: () => import('./EpisodeContainer'),
  loading: LoadingComponent,
  delay: 300
})

const AsyncNotFound = Loadable({
  loader: () => import('../components/common/NotFound'),
  loading: LoadingComponent,
  delay: 300
})

class Main extends Component {
  render() {
    const { isAuthenticated } = this.props
    return (
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path="/" component={AsyncHome} />
            <Route path="/login" component={AsyncLogin} />
            <Route path="/signup" component={AsyncSignup} />
            <Route path="/oauth/callback" component={WeChatCallbackContainer} />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              path="/user/profile"
              component={AsyncProfile}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              path="/settings"
              component={ProfileSettings}
            />
            <Route path="/reset-password" component={ResetPasswordContainer} />
            <Route exact path="/:courseName" component={AsyncCourse} />
            <Route
              exact
              path="/:courseName/:episodeName"
              component={AsyncEpisode}
            />
            <Route component={AsyncNotFound} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default withMui(Main)
