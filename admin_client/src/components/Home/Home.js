import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { MAX_WIDTH } from '../../constants/GlobalStyle'

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
  componentDidMount() {
    const { count, getUsers } = this.props
    if (!count) {
      getUsers()
    }
  }

  render() {
    const { classes: s, count } = this.props
    return <div className={s.listWrap}>总人数：{count}</div>
  }
}

export default withStyles(styles)(Home)
