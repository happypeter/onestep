export const getEpAuthStatus = state => state.fakeAuth.epAuthStatus

export const getIsEpisodePaid = state => {
  switch (state.fakeAuth.epAuthStatus) {
    case 'LOADING':
      return null
    case 'SUCCESS':
      return state.fakeAuth.isEpisodePaid
    case 'FAILURE':
      return 'FAILURE'
    default:
      return null
  }
}
