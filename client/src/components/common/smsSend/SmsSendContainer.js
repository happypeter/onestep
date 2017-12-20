import React, { Component } from 'react'
import { connect } from 'react-redux'
import SmsSend from './SmsSend'
import { getSmsSendState } from '../../../redux/selectors/commonSelectors.js'
import {
  sendMsg,
  countdown,
  readyToSendMsg,
  smsSendInit
} from '../../../redux/actions/smsSendAction'
import PropTypes from 'prop-types'

class SmsSendContainer extends Component {

  _mounted = false

  componentDidMount() {
    this._mounted = true
  }

  componentWillUnmount() {
    this._mounted = false
    this.props.smsSendInit()
  }

  timer = () => {
      let promise = new Promise((resolve, reject) => {
        let setTimer = setInterval(
          () => {
            this.props.countdown()
            if (this.props.smsSendState.second <= 0) {
              this.props.readyToSendMsg()
              console.log(this.props.smsSendState)
              resolve(setTimer)
            }
            if (!this._mounted) {
              reject(setTimer)
            }
          }
          , 1000)
      })

      promise.then((setTimer) => {
        clearInterval(setTimer)
        console.log('CLEAR INTERVAL')
      })
      .catch(
        (setTimer) => {
          clearInterval(setTimer)
          console.log('CLEAR INTERVAL IN REJECTION')
        }
      )
  }

  sendMsg = () => {
    if (!this.props.phoneNumIsValid) {
      console.log('phoneNum is not valid')
      return
    }
    // action
    this.props.sendMsg(this.props.phoneNum)
    this.timer()
  }

  render () {
    console.log(this.props);
    return (
      <SmsSend
        label={this.props.smsSendState.alreadySendMsg ? this.props.smsSendState.second : '发送'}
        disabled={this.props.smsSendState.alreadySendMsg ? true : false}
        raised={this.props.smsSendState.alreadySendMsg ? true : false}
        onClick={this.sendMsg}
       />
    )
  }
}

SmsSendContainer.PropTypes = {
  sendMsg: PropTypes.func.isRequired,
  countdown: PropTypes.func.isRequired,
  readyToSendMsg: PropTypes.func.isRequired,
  smsSendInit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  smsSendState: getSmsSendState(state)
})

export default connect(mapStateToProps, {
  sendMsg,
  countdown,
  readyToSendMsg,
  smsSendInit
})(SmsSendContainer)
