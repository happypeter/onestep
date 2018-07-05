import React from 'react'
import CourseList from '../../containers/CourseListContainer'
import Hero from './Hero'
import MobileHero from './MobileHero'
import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

const styles = theme => ({})

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
        <CourseList />
      </div>
    )
  }
}

export default withStyles(styles)(Home)
