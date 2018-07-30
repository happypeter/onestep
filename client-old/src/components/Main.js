import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router'
import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'
import { PrivateRoute, history } from '../utils/routerUtils'
import { withStyles } from '@material-ui/core/styles'
import withMui from '../utils/withMui'
import Layout from '../containers/LayoutContainer'

const styles = theme => ({
  '@global': {
    a: {
      color: theme.palette.primary.dark,
      textDecoration: 'none'
    }
  }
})

const AsyncHome = Loadable({
  loader: () => import('../containers/HomeContainer'),
  loading: LoadingComponent,
  delay: 300
})

const AsyncSignup = Loadable({
  loader: () => import('../containers/SignupContainer'),
  loading: LoadingComponent,
  delay: 300
})

const AsyncCart = Loadable({
  loader: () => import('../containers/CartContainer'),
  loading: LoadingComponent,
  delay: 300
})

const AsyncLogin = Loadable({
  loader: () => import('../containers/LoginContainer'),
  loading: LoadingComponent,
  delay: 300
})

const AsyncProfile = Loadable({
  loader: () => import('../containers/ProfileContainer'),
  loading: LoadingComponent,
  delay: 300
})

const AsyncCourse = Loadable({
  loader: () => import('../containers/CourseContainer'),
  loading: LoadingComponent,
  delay: 300
})

const AsyncEpisode = Loadable({
  loader: () => import('../containers/EpisodeContainer'),
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
            <Route path="/cart" component={AsyncCart} />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              path="/user/profile"
              component={AsyncProfile}
            />
            <Route exact path="/:courseUid" component={AsyncCourse} />
            <Route
              exact
              path="/:courseUid/:episodeUid"
              component={AsyncEpisode}
            />
            <Route component={AsyncNotFound} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default withMui(withStyles(styles)(Main))
