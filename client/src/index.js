import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { injectGlobal } from 'styled-components'

injectGlobal`
  body {

    font-family: PingFangSC-Regular;
    p {
      font-family: -apple-system, BlinkMacSystemFont,
      "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
      "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    }
    p.thin {
      font-weight: 100;
    }
    p.normal {
      font-weight: normal;
    }
    p.thick {
      font-weight: bold;
    }
  }
`

injectTapEventPlugin()

ReactDOM.render(<App />, document.getElementById('root'))
