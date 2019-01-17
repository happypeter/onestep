import React from 'react'
import ReactDOM from 'react-dom'
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles'
import JssProvider from 'react-jss/lib/JssProvider'
// Your top level component
import App from './App'
import theme from './theme'

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  const generateClassName = createGenerateClassName()
  const render = Comp => {
    renderMethod(
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Comp />
        </MuiThemeProvider>
      </JssProvider>,
      document.getElementById('root')
    )
  }

  // Render!
  render(App)
}
