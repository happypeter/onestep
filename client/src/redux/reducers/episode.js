const initialState = {
  status: 'LOADING',
  doc: '',
  vlink: '',
  title: '',
  courseCatalogue: ''
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FETCH_STARTED': {
      return {status: 'LOADING'}
    }
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        status: 'SUCCESS',
        doc: action.res && action.res.doc,
        vlink: action.res && action.res.vlink,
        title: action.res && action.res.title,
        name: action.res && action.res.name,
        courseCatalogue: action.res && action.res.courseCatalogue
      }
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
