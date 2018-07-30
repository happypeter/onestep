import React from 'react'
import { Link } from 'react-static'
import { withStyles } from '@material-ui/core/styles'
import { MAX_WIDTH } from '../../constants/GlobalStyle'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    maxWidth: MAX_WIDTH,
    margin: '24px auto'
  }
})

class Home extends React.Component {
  render() {
    const { classes: s } = this.props
    return (
      <div className={s.root}>
        <Link to="/coin">课程页面</Link>
      </div>
    )
  }
}

export default withStyles(styles)(Home)
