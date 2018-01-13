const initialState = {
  usernameIsValid: false,
  phoneNumIsValid: false,
  passwordIsValid: false,
  passwordConsistentIsValid: false,
  smsCodeIsValid: false,
  tabValue: 0,
  testErrObj: {
    username: '',
    phoneNum: '',
    password: '',
    passwordConsistent: '',
    smsCode: '',
  },
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FORM_ERR_INIT':
      console.log(`form state`, state)
      return initialState
    case 'PHONE_NUM_NOT_VALID':
      return {
        ...state,
        phoneNumIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          phoneNum: '请输入正确的手机号',
        },
      }
    case 'PHONE_NUM_IS_VALID':
      return {
        ...state,
        phoneNumIsValid: true,
        testErrObj: {
          ...state.testErrObj,
          phoneNum: '',
        },
      }
    case 'PHONE_NUM_ALREADY_EXISTS':
      return {
        ...state,
        phoneNumIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          phoneNum: '该号码已注册，请直接登录',
        },
      }
    case 'PHONE_NUM_DOESNOT_EXIST':
      return {
        ...state,
        phoneNumIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          phoneNum: '该号码尚未注册',
        },
      }
    case 'PLEASE_USE_PHONE_NUM':
      return {
        ...state,
        phoneNumIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          phoneNum: '已绑定过手机号，请直接用手机号登录',
        },
      }
    case 'USERNAME_IS_REQUIRED':
      return {
        ...state,
        usernameIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          username: '请输入用户名',
        },
      }
    case 'USERNAME_IS_VALID':
      return {
        ...state,
        usernameIsValid: true,
        testErrObj: {
          ...state.testErrObj,
          username: '',
        },
      }
    case 'USERMANE_ALREADY_EXISTS':
      return {
        ...state,
        usernameIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          username: '该用户名已被注册',
        },
      }
    case 'USER_DOESNOT_EXIST':
      return {
        ...state,
        usernameIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          username: '该用户名不存在',
        },
      }
    case 'PASSWORD_IS_REQUIRED':
      return {
        ...state,
        passwordIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          password: '请输入密码',
        },
      }
    case 'PASSWORD_TOO_SHORT':
      return {
        ...state,
        passwordIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          password: '请输入6位以上的密码',
        },
      }
    case 'INVALID_PASSWORD':
      return {
        ...state,
        passwordIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          password: '密码无效',
        },
      }
    case 'PASSWORE_IS_VALID':
      return {
        ...state,
        passwordIsValid: true,
        testErrObj: {
          ...state.testErrObj,
          password: '',
        },
      }
    case 'PASSWORDS_INCONSISTENT':
      return {
        ...state,
        passwordConsistentIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          passwordConsistent: '两次密码必须相同',
        },
      }
    case 'PASSWORDS_CONSISTENT':
      return {
        ...state,
        passwordConsistentIsValid: true,
        testErrObj: {
          ...state.testErrObj,
          passwordConsistent: '',
        },
      }
    case 'SMSCODE_IS_REQUIRED':
      return {
        ...state,
        smsCodeIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          smsCode: '请输入验证码',
        },
      }
    case 'SMSCODE_IS_VALID':
      return {
        ...state,
        smsCodeIsValid: true,
        testErrObj: {
          ...state.testErrObj,
          smsCode: '',
        },
      }
    case 'SMS_ERR_TRY_AGAIN':
      return {
        ...state,
        smsCodeIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          smsCode: '出错 请重新获取验证码',
        },
      }
    case 'SMS_CODE_IS_INVALID':
      return {
        ...state,
        smsCodeIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          smsCode: '验证码不正确',
        },
      }
    case 'EXPIRED_SMS_CODE':
      return {
        ...state,
        smsCodeIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          smsCode: '验证码已过期',
        },
      }
    case 'ALTER':
      return {
        ...state,
        tabValue: action.data && action.data.value,
      }
    default:
      return state
  }
}
