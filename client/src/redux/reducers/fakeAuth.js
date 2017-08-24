let fakeAuth = {
 isAuthenticated: false,
 redirectToReferrer: false,
}

export default function coursesReducer(state=fakeAuth, action) {
  switch (action.type) {
    case 'TO_REFERRER':
      return { ...state, redirectToReferrer: true }

    case 'IS_AUTH':
      console.log("action");
      console.log({...state, isAuthenticated: true});
      return { ...state, isAuthenticated: true }
      
    default:
      return state
  }
}
