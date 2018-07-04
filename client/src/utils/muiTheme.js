import { createMuiTheme } from '@material-ui/core/styles'
import cyan from '@material-ui/core/colors/cyan'
import pink from '@material-ui/core/colors/pink'
import red from '@material-ui/core/colors/red'

export const theme = createMuiTheme({
  palette: {
    primary: {
      ...cyan,
      A500: '#00BCD4',
      contrastText: '#fff'
    },
    secondary: {
      ...pink
    },
    error: red
  }
})
