import React from 'react'
import CourseList from '../../containers/CourseListContainer'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  hero: {
    position: 'relative',
    height: 1000
  },
  bgShape: {
    position: 'absolute',
    backgroundImage: `linear-gradient(100deg, ${
      theme.palette.primary.main
    },#ffffff)`,
    top: -350,
    right: -110,
    borderRadius: '8%',
    width: '50%',
    height: 800,
    transform: 'skew(3deg,30deg)',
    opacity: 1
  },
  bgCircle: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `linear-gradient(100deg, ${theme.palette.primary.main}, ${
      theme.palette.primary.dark
    })`,
    top: -400,
    left: -350,
    borderRadius: '100%',
    height: 800,
    width: 800,
    opacity: 0.2
  },
  bgCircleTwo: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `linear-gradient(100deg, ${theme.palette.primary.main}, ${
      theme.palette.primary.dark
    })`,
    top: 150,
    left: 350,
    borderRadius: '100%',
    height: 100,
    width: 100,
    opacity: 0.8
  },
  content: {
    display: 'flex',
    width: 1600,
    margin: '0 auto',
    justifyContent: 'space-between',
    marginLeft: -800,
    left: '50%',
    top: 200,
    position: 'absolute',
    zIndex: 1000,
    border: '2px solid red'
  }
})

class Home extends React.Component {
  render() {
    const { classes: s } = this.props
    return (
      <div>
        <div className={s.hero}>
          <div className={s.content}>
            <div>
              <Typography variant="headline">好奇猫</Typography>
            </div>
            <img src="/dashboard.jpg" alt="db" />
          </div>
          <div className={s.bgShape} />
          <div className={s.bgCircle} />
          <div className={s.bgCircleTwo} />
        </div>
        <CourseList />
      </div>
    )
  }
}

export default withStyles(styles)(Home)
