import React, {Component} from 'react'
import {connect} from 'react-redux'
import {authWeChat} from '../redux/actions/authAction'
import WeChatCallBack from '../components/auth/WeChatCallback'

const WeChatCallbackContainer = props => <WeChatCallback {...props} />

export default connect(null, {authWeChat})(WeChatCallbackContainer)
