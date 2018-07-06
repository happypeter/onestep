import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['Roboto'].join(','),
    headline: {},
    subheading: {
      fontSize: 16,
      color: 'rgba(33,33,33,.8)',
    },
  },
})

export default theme
