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
    position: 'relative',
    height: '100vh'
  },
  content: {
    marginLeft: -DRAWER_WIDTH,
    flexGrow: 1,
    flexShrink: 0,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 8,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
})

class Layout extends React.Component {
  componentDidMount() {
    // 预加载 Drawer 组件
    Drawer.preload()
  }

  render() {
    const { children, goto, currentUser, classes: s, history } = this.props

    return (
      <div className={s.root}>
        <Header currentUser={currentUser} goto={goto} history={history} />

        <div className={classNames(s.content)}>{children}</div>
      </div>
    )
  }
}

Layout.propTypes = {}

export default withStyles(styles)(Layout)
