import React from 'react'
import CourseList from '../../containers/CourseListContainer'
import Hero from './Hero'
import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import PropTypes from 'prop-types'

const styles = theme => ({
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
      width: 1400,
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
          <CourseList />
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  goto: PropTypes.func.isRequired
}

export default withStyles(styles)(Home)
