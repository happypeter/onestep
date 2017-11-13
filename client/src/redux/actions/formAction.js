export function formErrInit (data) {
  return dispatch => {
    dispatch({
      type: 'FORM_ERR_INIT'
    })
  }
}

// export function mailboxNotValid (data) {
//   return dispatch => {
//     dispatch({
//       type: 'MAILBOX_NOT_VALID'
//     })
//   }
// }
//
// export function mailboxIsValid (data) {
//   return dispatch => {
//     dispatch({
//       type: 'MAILBOX_IS_VALID'
//     })
//   }
// }

export function phoneNumNotValid (data) {
  return dispatch => {
    dispatch({
      type: 'PHONE_NUM_NOT_VALID'
    })
  }
}

export function phoneNumIsValid (data) {
  return dispatch => {
    dispatch({
      type: 'PHONE_NUM_IS_VALID'
    })
  }
}

export function usernameIsRequired (data) {
  return dispatch => {
    dispatch({
      type: 'USERNAME_IS_REQUIRED'
    })
  }
}

export function usernameIsValid (data) {
  return dispatch => {
    dispatch({
      type: 'USERNAME_IS_VALID'
    })
  }
}

export function passwordIsRequired (data) {
  return dispatch => {
    dispatch({
      type: 'PASSWORD_IS_REQUIRED'
    })
  }
}

export function passwordTooShort (data) {
  return dispatch => {
    dispatch({
      type: 'PASSWORD_TOO_SHORT'
    })
  }
}

export function passwordIsValid (data) {
  return dispatch => {
    dispatch({
      type: 'PASSWORE_IS_VALID'
    })
  }
}

export function passwordsInconsistent (data) {
  return dispatch => {
    dispatch({
      type: 'PASSWORDS_INCONSISTENT'
    })
  }
}

export function passwordsConsistent (data) {
  return dispatch => {
    dispatch({
      type: 'PASSWORDS_CONSISTENT'
    })
  }
}
