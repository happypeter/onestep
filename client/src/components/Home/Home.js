import React from 'react'
import CourseList from '../../containers/CourseListContainer'
import Hero from './Hero'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const styles = theme => ({})

class Home extends React.Component {
  render() {
    const { classes: s } = this.props
    return (
      <div>
        <Hero />
        <CourseList />
      </div>
    )
  }
}

export default withStyles(styles)(Home)
