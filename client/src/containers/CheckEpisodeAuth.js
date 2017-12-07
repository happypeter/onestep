import React from 'react'
import { connect } from 'react-redux'
import { checkEpisodeAuth } from '../redux/actions/authAction'
import { showNotPaidNotification } from '../redux/actions/notificationAction'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

export function requireEpisodeAuth (Component) {
  class EpisodeAuthComponent extends Component {

    componentDidMount () {
      // keep render() a pure func
      let {
        isAuthenticated,
        isEpisodePaid,
        showNotPaidNotification
      } = this.props

      if (isAuthenticated && !isEpisodePaid) {
        // show notification
        showNotPaidNotification()
      }
    }

    render () {
      let {
        match: {params: {courseName}},
        isAuthenticated,
        isEpisodePaid
      } = this.props

      if (!isAuthenticated) {
        return (
          // <Redirect to={{
          //   pathname: '/wechatLogin',
          //   state: { from: this.props.location }
          // }} />
          <Redirect to={{
            pathname: '/login',
            state: { from: this.props.location }
          }} />
        )
      } else {
        // 登录中
        if (isEpisodePaid) {
          return <Component {...this.props} />
        }
        // 无权限
        return <Redirect to={`/${courseName}`} />
      }
    }
  }

  EpisodeAuthComponent.PropTypes = {
    checkEpisodeAuth: PropTypes.func.isRequired,
    showNotPaidNotification: PropTypes.func.isRequired
  }
  const mapStateToProps = (state) => ({
    isAuthenticated: state.fakeAuth.isAuthenticated,
    isEpisodePaid: state.fakeAuth.isEpisodePaid
  })

  return connect(mapStateToProps, { checkEpisodeAuth, showNotPaidNotification })(EpisodeAuthComponent)
}
