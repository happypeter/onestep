import { createMuiTheme } from '@material-ui/core/styles'
import cyan from '@material-ui/core/colors/cyan'
import pink from '@material-ui/core/colors/pink'
import red from '@material-ui/core/colors/red'

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true // No more ripple, on the whole application 💣!
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['Roboto'].join(','),
    headline: {},
    subheading: {
      fontSize: 16,
      color: 'rgba(33,33,33,.8)'
    }
  },
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

export default theme
