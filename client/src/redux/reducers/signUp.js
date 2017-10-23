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
    console.log({
      ...state,
      passwordIsValid: false,
      testErrObj: {
        username: '',
        mailbox: '',
        password: '请输入6位以上的密码',
        passwordConsistent: ''
      }
    });
      return {
        ...state,
        passwordIsValid: false,
        testErrObj: {
          username: '',
          mailbox: '',
          password: '请输入6位以上的密码',
          passwordConsistent: ''
        }
      }
    case 'PASSWORE_IS_VALID':
      return {
        ...state,
        passwordIsValid: true,
        testErrObj: {
          username: '',
          mailbox: '',
          password: '',
          passwordConsistent: ''
        }
      }
    case 'PASSWORDS_INCONSISTENT':
      return {
        ...state,
        passwordConsistentIsValid: false,
        testErrObj: {
          username: '',
          mailbox: '',
          password: '',
          passwordConsistent: '两次密码不相同'
        }
      }
    case 'PASSWORDS_CONSISTENT':
    console.log({
      ...state,
      passwordConsistentIsValid: true,
      testErrObj: {
        username: '',
        mailbox: '',
        password: '',
        passwordConsistent: ''
      }
    });
      return {
        ...state,
        passwordConsistentIsValid: true,
        testErrObj: {
          username: '',
          mailbox: '',
          password: '',
          passwordConsistent: ''
        }
      }
    default:
      return state
  }
}
