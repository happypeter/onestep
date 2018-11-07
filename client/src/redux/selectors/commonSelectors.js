// auth
export const getIsAuthenticated = state => state.auth.isAuthenticated
export const getCurrentUser = state => state.auth.currentUser
export const getIsMember = state => {
  const user = state.auth.currentUser
  return (user && user.coin && user.coin > 0) || false
}
export const getPaidCourses = state => {
  const user = state.auth.currentUser
  return (user && user.paidCourses) || []
}
export const getIsAdmin = state => {
  const user = state.auth.currentUser
  return (user && user.admin) || false
}
export const getIsVip = state => {
  const user = state.auth.currentUser
  return (user && user.vip) || false
}
// smsSend
export const getSmsSendState = state => state.smsSend

// notification
export const getNotification = state => state.common.notification

export const getEpisodeMarkdown = state => {
  return state.episode.doc
}
