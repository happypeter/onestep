import React from 'react'
import { connect } from 'react-redux'
import { checkEpisodeAuth } from '../redux/actions/authAction'
import { showNotPaidNotification } from '../redux/actions/notificationAction'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

export function requireEpisodeAuth (Component) {
  class EpisodeAuthComponent extends Component {

    componentWillMount () {
      let phoneNum = window.sessionStorage.getItem('user')
      let {match: {params: {courseName}}} = this.props
      this.checkEpisodeAuth({phoneNum, courseName})
    }

    componentDidMount () {
      // keep render() a pure func, change state here
      let {
        status,
        isEpisodePaid,
        showNotPaidNotification
      } = this.props

      if (status === 'SUCCESS' && !isEpisodePaid) {
        // show notification
        showNotPaidNotification()
      }
    }

    checkEpisodeAuth ({ phoneNum, courseName }) {
      this.props.checkEpisodeAuth({ phoneNum, courseName })
    }

    render () {
      let {
        match: {params: {courseName}},
        status,
        isEpisodePaid
      } = this.props

      switch (status) {
        case 'LOADING':
          return null
        case 'SUCCESS':
          if (isEpisodePaid) {
            return <Component {...this.props} />
          } else {
            return <Redirect to={`/${courseName}`} />
          }
        case 'FAILURE':
          return <div>鉴权失败，请重试</div>
        default:
          return null
      }
    }
  }

  EpisodeAuthComponent.PropTypes = {
    checkEpisodeAuth: PropTypes.func.isRequired,
    showNotPaidNotification: PropTypes.func.isRequired
  }
  const mapStateToProps = (state) => ({
    isEpisodePaid: state.fakeAuth.isEpisodePaid,
    status: state.fakeAuth.epAuthStatus
  })

  return connect(mapStateToProps, { checkEpisodeAuth, showNotPaidNotification })(EpisodeAuthComponent)
}
