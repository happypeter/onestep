import React from 'react'
import { connect } from 'react-redux'
import { checkEpisodeAuth } from '../redux/actions/authAction'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

export function requireEpisodeAuth (Component) {
  class EpisodeAuthComponent extends Component {

    componentDidMount () {
      // console.log(this.props);
      let {match: {params: {courseName}}} = this.props
      let token = window.sessionStorage.getItem('jwtToken')
      const phoneNum = window.sessionStorage.getItem('user')

      this.props.checkEpisodeAuth({courseName, token, phoneNum})
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
    checkEpisodeAuth: PropTypes.func.isRequired
  }
  const mapStateToProps = (state) => ({
    isAuthenticated: state.fakeAuth.isAuthenticated,
    isEpisodePaid: state.fakeAuth.isEpisodePaid
  })

  return connect(mapStateToProps, { checkEpisodeAuth })(EpisodeAuthComponent)
}
