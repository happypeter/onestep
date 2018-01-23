import {createMuiTheme} from 'material-ui/styles'
import cyan from 'material-ui/colors/cyan'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'

export const theme = createMuiTheme({
  palette: {
    primary: {
      ...cyan,
      A500: '#00BCD4',
    },
    secondary: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  },
})
