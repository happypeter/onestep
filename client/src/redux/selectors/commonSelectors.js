// course
export const getCourses = state => state.courses
export const getCourse = state => state.course
export const getEpisode = state => state.episode

// auth
export const getCurrentUser = state => state.auth
export const getIsAuthenticated = state => state.auth.isAuthenticated

// smsSend
export const getSmsSendState = state => state.smsSend

// notification
export const getNotification = state => state.notification

export const getProfile = state => state.profile

export const getCurrentCourseUid = state => {
  return state.course.item.uid
}
export const getCourseTocContent = state => {
  return state.course.item.content
}

export const getPaidCourses = state => {
  const paidCourses =
    state.auth && state.auth.currentUser && state.auth.currentUser.paidCourses
  return paidCourses || []
}
