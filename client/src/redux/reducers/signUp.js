const initialState = {
  usernameIsValid: true,
  mailboxIsValid: true,
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
          passwordConsistent: '两次密码不相同'
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
