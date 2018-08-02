import React from 'react'
import { Link } from 'react-static'
import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import { MAX_WIDTH } from '../../constants/GlobalStyle'
import Hero from './Hero'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    maxWidth: MAX_WIDTH,
    margin: '24px auto'
  },
  listWrap: {
    [theme.breakpoints.up('md')]: {
      width: 700,
      margin: '0 auto'
    },
    [theme.breakpoints.up('lg')]: {
      width: 1000,
      margin: '0 auto'
    },
    [theme.breakpoints.up('xl')]: {
      width: 1100,
      margin: '0 auto'
    }
  }
})

class Home extends React.Component {
  render() {
    const { classes: s, goto } = this.props
    return (
      <div>
        <Hidden mdDown>
          <Hero goto={goto} />
        </Hidden>
        <div className={s.listWrap}>
          <Link to="/coin">一币一别墅</Link>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home)
