import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import universal from 'react-universal-component'
import { DRAWER_WIDTH } from '../../constants/GlobalStyle'
import Header from './Header'

const Failed = () => (
  <div style={{ color: 'red' }}>
    <h1>Failed to load the Drawer!</h1>
  </div>
)

const Loading = () => (
  <div style={{ color: '#00bcd4' }}>
    <h1>Loading this Drawer...</h1>
  </div>
)

const Drawer = universal(import('../../containers/DrawerContainer'), {
  loading: Loading,
  error: Failed
})

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      position: 'relative'
    }
  },
  content: {
    marginLeft: -DRAWER_WIDTH,
    flexGrow: 1,
    flexShrink: 0,
    height: '100vh',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 8,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerWrap: {
    width: DRAWER_WIDTH
  }
})

class Layout extends React.Component {
  componentDidMount() {
    // 预加载 Drawer 组件
    Drawer.preload()
  }

  render() {
    const {
      children,
      toggleDrawer,
      isDrawerOpen,
      isDrawerFirstLoad,
      goto,
      currentUser,
      classes: s,
      history
    } = this.props

    return (
      <div className={s.root}>
        <Header
          currentUser={currentUser}
          goto={goto}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
          history={history}
        />

        <div className={s.drawerWrap}>
          {isDrawerFirstLoad ? null : <Drawer />}
        </div>

        <div
          className={classNames(s.content, {
            [s.contentShift]: isDrawerOpen
          })}
        >
          {children}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  isDrawerFirstLoad: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired
}

export default withStyles(styles)(Layout)
