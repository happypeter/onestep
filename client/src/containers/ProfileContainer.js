import React, { Component } from 'react'
import { connect } from 'react-redux'
import Profile from '../components/Profile/Profile'
import { fetchProfile } from '../redux/actions/profileAction'

class ProfileContainer extends Component {
  componentDidMount () {
    const username = window.sessionStorage.getItem('user')
    this.props.fetchProfile(username)
    console.log(username)
  }

  render () {
    const {latestExpireDate, total, courses, status} = this.props.state

    return (
      <div>
        <Profile
          status={status}
          latestExpireDate={latestExpireDate}
          total={total}
          courses={courses}
         />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state: state.profile
})

export default connect(mapStateToProps, { fetchProfile })(ProfileContainer)
