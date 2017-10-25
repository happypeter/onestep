import React, { Component } from 'react'
import Main from './Main'
import { Provider } from 'react-redux'
import store from '../redux/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Main />
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
