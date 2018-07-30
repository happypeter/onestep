import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'

// Your top level component
import App from './App'
import theme from './theme'

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  const render = Comp => {
    renderMethod(
      <MuiThemeProvider theme={theme}>
        <Comp />
      </MuiThemeProvider>,
      document.getElementById('root')
    )
  }

  // Render!
  render(App)
}
