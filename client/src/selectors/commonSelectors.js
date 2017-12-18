// course
export const getCourses = state => state.courses
export const getCourse = state => state.course
export const getEpisode = state => state.episode
// auth
export const getCurrentUser = state => state.fakeAuth
export const getIsAuthenticated = state => state.fakeAuth.isAuthenticated
export const getIsEpisodePaid = state => state.fakeAuth.isEpisodePaid
export const getEpAuthStatus = state => state.fakeAuth.epAuthStatus

// form
export const getFormState = state => state.form

// notification
export const getNotification = state => state.notification

export const getProfile = state => state.profile
