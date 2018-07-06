import React, { PureComponent } from 'react'
// eslint-disable-next-line
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'typeface-roboto'
import store from './store'
import Main from './components/Main'

class App extends PureComponent {
  // Remove the server-side injected CSS.
  // https://github.com/cssinjs/jss/blob/master/docs/ssr.md
  componentDidMount () {
    // eslint-disable-next-line
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render () {
    return (
      <Provider store={store}>
        <div>
          <CssBaseline />
          <Main />
        </div>
      </Provider>
    )
  }
}

export default hot(module)(App)
