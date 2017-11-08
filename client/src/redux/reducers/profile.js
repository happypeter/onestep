const initialState = {
  status: 'LOADING'
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FETCH_STARTED': {
      return {status: 'LOADING'}
    }
    case 'FETCH_SUCCESS': {
      return {...state, status: 'SUCCESS', ...action.res}
    }
    case 'FETCH_FAILURE': {
      if (action.error.response) {
        console.log(action.error.response.data.errorMsg)
      } else {
        console.log(action.error)
      }
      return {status: 'FAILURE'}
    }

    default:
      return state
  }
}
