import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {requireAuthentication} from './CheckToken'
import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'
import ProfileSettings from './ProfileSettingsContainer'
import WeChatCallbackContainer from './WeChatCallbackContainer'
import ResetPasswordContainer from './ResetPasswordContainer'
import '../assets/global.css'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import cyan from 'material-ui/colors/cyan'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'


const AsyncHome = Loadable({
  loader: () => import('../components/Home/Home'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncSignup = Loadable({
  loader: () => import('./SignupContainer'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncLogin = Loadable({
  loader: () => import('./LoginContainer'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncProfile = Loadable({
  loader: () => import('./ProfileContainer'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncCourse = Loadable({
  loader: () => import('./CourseContainer'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncEpisode = Loadable({
  loader: () => import('./EpisodeContainer'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncNotFound = Loadable({
  loader: () => import('../components/common/NotFound'),
  loading: LoadingComponent,
  delay: 300,
})


const theme = createMuiTheme({
  palette: {
    primary: {
      ...cyan,
      A500: '#00BCD4',
    },
    secondary: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  },
})


class Main extends Component {


  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={AsyncHome} />
            <Route path="/login" component={AsyncLogin} />
            <Route path="/signup" component={AsyncSignup} />
            <Route path="/oauth/callback" component={WeChatCallbackContainer} />
            <Route
              exact
              path="/user/profile"
              component={requireAuthentication(AsyncProfile)}
            />
            <Route
              exact
              path="/settings"
              component={requireAuthentication(ProfileSettings)}
            />
            <Route path="/reset-password" component={ResetPasswordContainer} />
            <Route exact path="/:courseName" component={AsyncCourse} />
            <Route
              path="/:courseName/:episodeName"
              component={requireAuthentication(AsyncEpisode)}
            />
            <Route component={AsyncNotFound} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default Main
