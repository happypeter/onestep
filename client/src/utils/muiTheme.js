import { createMuiTheme } from '@material-ui/core/styles'
import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'

export const theme = createMuiTheme({
  palette: {
    primary: {
      ...cyan,
      A500: '#00BCD4',
      contrastText: '#fff'
    },
    secondary: {
      ...green,
      A400: '#00e677'
    },
    error: red
  }
})
