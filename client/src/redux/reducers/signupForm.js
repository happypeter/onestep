const initialState = {
  usernameIsValid: false,
  mailboxIsValid: false,
  passwordIsValid: false,
  passwordConsistentIsValid: false,
  testErrObj: {
    username: '',
    mailbox: '',
    password: '',
    passwordConsistent: ''
  }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'MAILBOX_NOT_VALID':
      return {
        ...state,
        mailboxIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          mailbox: '请输入格式正确的邮箱'
        }
      }
    case 'MAILBOX_IS_VALID':
      return {
        ...state,
        mailboxIsValid: true,
        testErrObj: {
          ...state.testErrObj,
          mailbox: ''
        }
      }
    case 'MAILBOX_ALREADY_EXISTS':
      return {
        ...state,
        mailboxIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          mailbox: '该邮箱已被注册'
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
    case 'PASSWORD_TOO_SHORT':
      return {
        ...state,
        passwordIsValid: false,
        testErrObj: {
          ...state.testErrObj,
          password: '请输入6位以上的密码'
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
