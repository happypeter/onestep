import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProfile } from '../redux/actions/profileAction'

import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'

const AsyncProfile = Loadable({
  loader: () => import('../components/Profile/Profile'),
  loading: LoadingComponent,
  delay: 300
})

class ProfileContainer extends Component {
  componentDidMount () {
    const phoneNum = window.sessionStorage.getItem('user')
    // fetch userInfo from server
    this.props.fetchProfile(phoneNum)
  }

  render () {
    const {latestExpireDate, total, courses, status} = this.props.state

    return (
      <div>
        <AsyncProfile
          status={status}
          latestExpireDate={latestExpireDate}
          total={total}
          courses={courses}
          allFakeCourses={this.props.allFakeCourses}
         />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state: state.profile,
  allFakeCourses: state.courses
})

export default connect(mapStateToProps, { fetchProfile })(ProfileContainer)
