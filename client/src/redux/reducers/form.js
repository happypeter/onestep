const initialState = {
  usernameIsValid: false,
  // mailboxIsValid: false,
  phoneNumIsValid: false,
  passwordIsValid: false,
  passwordConsistentIsValid: false,
  testErrObj: {
    username: '',
    // mailbox: '',
    phoneNum: '',
    password: '',
    passwordConsistent: ''
  }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FORM_ERR_INIT':
      return initialState
    // case 'MAILBOX_NOT_VALID':
    //   return {
    //     ...state,
    //     mailboxIsValid: false,
    //     testErrObj: {
    //       ...state.testErrObj,
    //       mailbox: '请输入格式正确的邮箱'
    //     }
    //   }

    // phone number
    case 'PHONE_NUM_NOT_VALID':
      return {
        ...state,
        phoneNumIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          phoneNum: '请输入正确的手机号'
        }
      }
    case 'PHONE_NUM_IS_VALID':
      return {
        ...state,
        phoneNumIsValid: true,
        testErrObj: {
          ...state.testErrObj,
          phoneNum: ''
        }
      }
    case 'PHONE_NUM_ALREADY_EXISTS':
      return {
        ...state,
        phoneNumIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          phoneNum: '该号码已被注册'
        }
      }
    case 'USERNAME_IS_REQUIRED':
      return {
        ...state,
        usernameIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          username: '请输入用户名'
        }
      }
    case 'USERNAME_IS_VALID':
      return {
        ...state,
        usernameIsValid: true,
        testErrObj: {
          ...state.testErrObj,
          username: ''
        }
      }
    case 'USERMANE_ALREADY_EXISTS':
      return {
        ...state,
        usernameIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          username: '该用户名已被注册'
        }
      }
    case 'USER_DOESNOT_EXIST':
      return {
        ...state,
        usernameIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          username: '该用户名不存在'
        }
      }
    case 'PASSWORD_IS_REQUIRED':
      return {
        ...state,
        passwordIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          password: '请输入密码'
        }
      }
    case 'PASSWORD_TOO_SHORT':
      return {
        ...state,
        passwordIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          password: '请输入6位以上的密码'
        }
      }
    case 'INVALID_PASSWORD':
      return {
        ...state,
        passwordIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          password: '密码无效'
        }
      }
    case 'PASSWORE_IS_VALID':
      return {
        ...state,
        passwordIsValid: true,
        testErrObj: {
          ...state.testErrObj,
          password: ''
        }
      }
    case 'PASSWORDS_INCONSISTENT':
      return {
        ...state,
        passwordConsistentIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          passwordConsistent: '两次密码必须相同'
        }
      }
    case 'PASSWORDS_CONSISTENT':
      return {
        ...state,
        passwordConsistentIsValid: true,
        testErrObj: {
          ...state.testErrObj,
          passwordConsistent: ''
        }
      }
    default:
      return state
  }
}
