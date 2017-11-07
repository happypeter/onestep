import React, { Component } from 'react'
import { connect } from 'react-redux'
import Profile from '../components/Profile/Profile'

class ProfileContainer extends Component {
  componentWillMount () {}

  render () {
    let {latestExpireDate, total, courses} = this.props.profile

    let test = courses.map(
      (item, i) => (
        <div key={i}>{item}</div>
      )
    )

    return (
      <div>
        <Profile
          latestExpireDate={latestExpireDate}
          total={total}
          courses={test}
         />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps)(ProfileContainer)
