import config from '../../config/config'
import {WECHAT_USER} from '../../constants/actionTypes/authActionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case WECHAT_USER:
      return action.user
    default:
      return state
  }
}
