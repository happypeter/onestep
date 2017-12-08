import React, { Component } from 'react'
import Main from './Main'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const theme = createMuiTheme()

class App extends Component {
  render () {
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
