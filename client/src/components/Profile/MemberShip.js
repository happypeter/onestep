import React from 'react'
import PropTypes from 'prop-types'

const MemberShip = ({ isMember }) => {
  if (isMember) {
    return <div>您目前依然处于会员服务期内，可以观看网站所有课程</div>
  }
  return <div>您还不是会员</div>
}

MemberShip.propTypes = {
  isMember: PropTypes.bool.isRequired
}

export default MemberShip
