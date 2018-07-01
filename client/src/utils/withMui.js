import React from 'react'

import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './muiTheme'

const withMui = Component => {
  class ComponentWithMui extends React.Component {
    render() {
      return (
        <div>
          <MuiThemeProvider theme={theme}>
            <Component {...this.props} />
          </MuiThemeProvider>
        </div>
      )
    }
  }
  return ComponentWithMui
}

export default withMui
