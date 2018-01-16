import React, {Component} from 'react'
import Main from './Main'
import {Provider} from 'react-redux'
import store from '../redux/store'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import cyan from 'material-ui/colors/cyan'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {setCurrentUser} from '../redux/actions/authAction'

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

function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}
const jwtToken = sessionStorage.jwtToken

if (jwtToken) {
  setAuthorizationToken(jwtToken)
  store.dispatch(setCurrentUser(jwtDecode(jwtToken)))
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Main />
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
