import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Link } from 'react-static'
import { MAX_WIDTH } from '../../constants/GlobalStyle'
import Hero from './Hero'
import CourseList from '../../components/CourseList'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    maxWidth: MAX_WIDTH,
    margin: '24px auto'
  },
  listWrap: {
    width: '100%',
    margin: '0 auto',
    padding: '24px 16px',
    [theme.breakpoints.up('md')]: {
      width: 700
    },
    [theme.breakpoints.up('lg')]: {
      width: 1000
    },
    [theme.breakpoints.up('xl')]: {
      width: 1100
    }
  },
  actions: {
    padding: '0 16px 64px',
    textAlign: 'center'
  },
  button: {
    width: '100%',
    maxWidth: 480,
    padding: 16,
    boxShadow: 'unset'
  },
  login: {
    display: 'block',
    marginTop: 24,
    textDecoration: 'none',
    color: '#00bcd4',
    fontWeight: 500
  }
})

class Home extends React.Component {
  render() {
    const { classes: s, courses, isAuthenticated } = this.props
    return (
      <div>
        <Hero />
        <div className={s.listWrap}>
          <CourseList courses={courses.published} title="最新发布" />
        </div>
        {!isAuthenticated && (
          <div className={s.actions}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              component={Link}
              to="/signup"
              className={s.button}
            >
              注册
            </Button>
            <Link to="/login" className={s.login}>
              登录
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Home)
