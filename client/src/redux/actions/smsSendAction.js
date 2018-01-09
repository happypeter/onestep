import axios from 'axios'
import config from '../../config/config'
import * as types from '../../constants/actionTypes/smsSendActionTypes.js'

// 不检测手机号是否存在 直接发送
export function sendMsg(phoneNum) {
  return dispatch => {
    axios
      .post(`${config.api + '/msg'}`, {phoneNum: phoneNum})
      .then(res => {
        // console.log(res)
      })
      .catch(err => {
        dispatch({type: types.SMS_ERR_TRY_AGAIN})
      })
    dispatch({type: types.ALREADY_SEND_MSG})
  }
}

// 当手机号重复 不予发送验证码
export function sendMsgforSignup(phoneNum) {
  return dispatch => {
    axios
      .post(`${config.api + '/signupcode'}`, {phoneNum: phoneNum})
      .then(res => {
        // console.log(res)
      })
      .catch(err => {
        if (
          err.response &&
          err.response.data.errorMsg === 'PHONE_NUM_ALREADY_EXISTS'
        ) {
          dispatch({type: types.PHONE_NUM_ALREADY_EXISTS})
        } else {
          dispatch({type: types.SMS_ERR_TRY_AGAIN})
        }
      })
    dispatch({type: types.ALREADY_SEND_MSG})
  }
}

export function countdown() {
  return dispatch => {
    dispatch({type: types.COUNT_DOWN})
  }
}

export function readyToSendMsg() {
  return dispatch => {
    dispatch({type: types.READY_TO_SEND_MSG})
  }
}

export function smsSendInit() {
  return dispatch => {
    dispatch({type: types.SMS_INIT})
  }
}
