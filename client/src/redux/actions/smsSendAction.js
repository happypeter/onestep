import axios from 'axios'
import config from '../../config/config'
import * as types from '../../constants/actionTypes/smsSendActionTypes.js'
import { showNotification } from './index'

function handleError(error, dispatch) {
  if (error.response) {
    dispatch(showNotification(error.response.data.errorMsg))
  } else {
    dispatch(showNotification('发送验证码失败'))
  }
}

// 当手机号重复，不予发送验证码
export function sendMsgforSignup(phoneNum) {
  return dispatch => {
    dispatch({ type: types.ALREADY_SEND_MSG })
    axios
      .post(`${config.api + '/smscode'}`, { phoneNum: phoneNum })
      .then(res => {
        if (res.data.success) {
          dispatch(showNotification(res.data.message))
        }
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}

export function countdown() {
  return dispatch => {
    dispatch({ type: types.COUNT_DOWN })
  }
}

export function readyToSendMsg() {
  return dispatch => {
    dispatch({ type: types.READY_TO_SEND_MSG })
  }
}

export function smsSendInit() {
  return dispatch => {
    dispatch({ type: types.SMS_INIT })
  }
}
