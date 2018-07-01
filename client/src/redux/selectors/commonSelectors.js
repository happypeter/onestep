// course
export const getCourse = state => state.course || {}
export const getCurrentCourse = state => state.currentCourse
export const getEpisode = state => state.episode

// auth
export const getCurrentUser = state =>
  (state.auth && state.auth.currentUser) || {}
export const getIsAuthenticated = state => state.auth.isAuthenticated

// smsSend
export const getSmsSendState = state => state.smsSend

// notification
export const getNotification = state => state.notification

export const getProfile = state => state.profile

export const getCurrentCourseUid = state => {
  return state.currentCourse.item.uid
}
export const getCourseTocContent = state => {
  return state.currentCourse.info.content
}

export const getPaidCourses = state => {
  const paidCourses =
    state.auth && state.auth.currentUser && state.auth.currentUser.paidCourses
  return paidCourses || []
}

export const getDetailedPaidCourses = state => {
  const allCourses = getCourse(state).all || []
  const paid = getPaidCourses(state)
  const detailedPaid = allCourses.filter(c => {
    return paid.includes(c.uid)
  })
  return detailedPaid
}

export const getIsMember = state =>
  (state.auth && state.auth.currentUser && state.auth.currentUser.member) ||
  false
