import React, {Component} from 'react'
import Main from './Main'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import cyan from 'material-ui/colors/cyan'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'
import {connect} from 'react-redux'
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

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Main setCurrentUser={this.props.setCurrentUser} />
      </MuiThemeProvider>
    )
  }
}

export default connect(null, {setCurrentUser})(App)
