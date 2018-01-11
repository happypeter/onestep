import React from 'react'
import {connect} from 'react-redux'
import {checkEpisodeAuth, initEpAuthStatus} from '../redux/actions/authAction'
import {notification} from '../redux/actions/notificationAction'
import {
  getIsEpisodePaid,
  getEpAuthStatus,
} from '../redux/selectors/episodeAuthSelectors.js'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

export function requireEpisodeAuth(Component) {
  class EpisodeAuthComponent extends Component {
    componentWillMount() {
      let phoneNum = window.sessionStorage.getItem('user')
      let {match: {params: {courseName}}} = this.props
      this.checkEpisodeAuth({phoneNum, courseName})
    }

    componentDidUpdate() {
      // keep render() a pure func, change state here
      this.checkShowNotPaidNotification()
    }

    componentWillUnmount() {
      // initialize episode-auth checking status
      this.props.initEpAuthStatus()
    }

    checkEpisodeAuth({phoneNum, courseName}) {
      this.props.checkEpisodeAuth({phoneNum, courseName})
    }

    checkShowNotPaidNotification() {
      let {status, isEpisodePaid, notification} = this.props

      if (status === 'SUCCESS' && !isEpisodePaid) {
        // show notification
        notification()
      }
    }

    render() {
      let {match: {params: {courseName}}, isEpisodePaid} = this.props

      switch (isEpisodePaid) {
        case true:
          return <Component {...this.props} />

        case false:
          notification()
          return <Redirect to={`/${courseName}`} />

        case 'FAILURE':
          return <div>鉴权失败，请重试</div>

        default:
          return null
      }
    }
  }

  EpisodeAuthComponent.propTypes = {
    checkEpisodeAuth: PropTypes.func.isRequired,
    notification: PropTypes.func.isRequired,
  }

  const mapStateToProps = state => ({
    isEpisodePaid: getIsEpisodePaid(state),
    status: getEpAuthStatus(state),
  })

  return connect(mapStateToProps, {
    checkEpisodeAuth,
    initEpAuthStatus,
    notification,
  })(EpisodeAuthComponent)
}
