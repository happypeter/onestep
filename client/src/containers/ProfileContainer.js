import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProfile} from '../redux/actions/profileAction'
import {getProfile} from '../redux/selectors/commonSelectors.js'
import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'

const AsyncProfile = Loadable({
  loader: () => import('../components/Profile/Profile'),
  loading: LoadingComponent,
  delay: 300,
})

class ProfileContainer extends Component {
  componentWillMount() {
    const phoneNum = window.sessionStorage.getItem('user')
    // fetch userInfo from server
    this.props.fetchProfile(phoneNum)
  }

  render() {
    const {latestExpireDate, total, paidCourses, status} = this.props.state
    const phoneNum = window.sessionStorage.getItem('user')
    // let { catalogue } = this.props.courses

    return (
      <div>
        <AsyncProfile
          status={status}
          latestExpireDate={latestExpireDate}
          total={total}
          paidCourses={paidCourses}
          // catalogue={catalogue}
          phoneNum={phoneNum}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  state: getProfile(state),
  // courses: state.courses
})

export default connect(mapStateToProps, {fetchProfile})(ProfileContainer)
