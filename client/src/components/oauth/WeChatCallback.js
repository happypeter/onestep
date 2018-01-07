import React, {Component} from 'react'
import {authWeChat} from '../../redux/actions/authAction'
import {connect} from 'react-redux'

class WeChatCallBack extends Component {
  componentWillMount = () => {
    const query = window.location.href.split('?')[1]
    if (query && query.split('&')) {
      const code = query.split('&')[0].slice(5)
      if (code) {
        if (!/MicroMessenger/i.test(window.navigator.userAgent)) {
          this.props.authWeChat({code, userAgent: 'PC'})
        } else {
          this.props.authWeChat({code, userAgent: 'MicroMessenger'})
        }
      }
    } else {
      this.props.history.push('/')
    }
  }

  render() {
    return <div>WeChatCallBack</div>
  }
}

export default connect(null, {authWeChat})(WeChatCallBack)
