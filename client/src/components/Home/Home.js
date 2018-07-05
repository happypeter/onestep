import React from 'react'
import CourseList from '../../containers/CourseListContainer'
import Hero from './Hero'
import MobileHero from './MobileHero'
import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

const styles = theme => ({
  listWrap: {
    [theme.breakpoints.up('md')]: {
      width: 700,
      margin: '0 auto'
    }
  }
})

class Home extends React.Component {
  render() {
    const { classes: s } = this.props
    return (
      <div>
        <Hidden mdDown>
          <Hero />
        </Hidden>
        <Hidden lgUp>
          <MobileHero />
        </Hidden>
        <div className={s.listWrap}>
          <CourseList />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home)
