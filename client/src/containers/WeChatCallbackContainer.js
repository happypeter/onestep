import React, {Component} from 'react'
import {connect} from 'react-redux'
import {oauthWeChat, oauthBinding} from '../redux/actions/authAction'
import WeChatCallback from '../components/oauth/WeChatCallback'

const WeChatCallbackContainer = props => <WeChatCallback {...props} />

const mapStateToProps = state => ({
  user: state.weChatUser,
})

export default connect(mapStateToProps, {oauthWeChat, oauthBinding})(WeChatCallbackContainer)
