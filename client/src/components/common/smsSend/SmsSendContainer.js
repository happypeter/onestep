import React from 'react'
import { connect } from 'react-redux'
import SmsSend from './SmsSend'
import { getSmsSendState } from '../../../redux/selectors/commonSelectors.js'
import {
  sendMsgforSignup,
  countdown,
  readyToSendMsg,
  smsSendInit
} from '../../../redux/actions/smsSendAction'
import PropTypes from 'prop-types'

const SmsSendContainer = props => <SmsSend {...props} />

SmsSendContainer.propTypes = {
  sendMsgforSignup: PropTypes.func.isRequired,
  countdown: PropTypes.func.isRequired,
  readyToSendMsg: PropTypes.func.isRequired,
  smsSendInit: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  smsSendState: getSmsSendState(state)
})

export default connect(
  mapStateToProps,
  {
    sendMsgforSignup,
    countdown,
    readyToSendMsg,
    smsSendInit
  }
)(SmsSendContainer)
