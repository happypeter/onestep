import axios from 'axios'
import config from '../../config/config'
import * as types from '../../constants/actionTypes/smsSendActionTypes.js'

export function sendMsg(phoneNum) {
  return dispatch => {
    axios
      .post(`${config.api + '/msg'}`, {phoneNum: phoneNum})
      .then(res => {
        // console.log(res)
      })
      .catch(err => {
        console.log(err)
        dispatch({type: types.SMS_ERR_TRY_AGAIN})
      })
    dispatch({type: types.ALREADY_SEND_MSG})
  }
}

export function countdown() {
  return dispatch => {
    dispatch({type: types.COUNTDOWN})
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
