import React, { PureComponent } from 'react'
// eslint-disable-next-line
import { Router } from 'react-static'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'typeface-roboto'
import history from './utils/routerUtils'
import store from './redux/store'
import Main from './components/Main'

class App extends PureComponent {
  // Remove the server-side injected CSS.
  // https://github.com/cssinjs/jss/blob/master/docs/ssr.md
  componentDidMount() {
    // eslint-disable-next-line
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  // NOTE: history 如果在 Main.js 中导入就会失灵，必须要在这里导入

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <CssBaseline />
            <Main />
          </div>
        </Router>
      </Provider>
    )
  }
}

if (process.env.REACT_STATIC_ENV !== 'production') {
  const { hot } = require('react-hot-loader')
  module.exports = hot(module)(App)
} else {
  module.exports = App
}
