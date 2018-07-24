import { filterEpisodeFromCurrentCourse } from './selectorUtils'
// course
export const getCourses = state => state.course.all || []
export const getCurrentCourse = state => state.currentCourse
export const getEpisode = state => state.episode || {}

// auth
export const getCurrentUser = state =>
  (state.auth && state.auth.currentUser) || {}
export const getIsAuthenticated = state => state.auth.isAuthenticated

// smsSend
export const getSmsSendState = state => state.smsSend

// notification
export const getNotification = state => state.common.notification || ''

export const getProfile = state => state.profile

export const getCourseTocContent = state => {
  return (state.currentCourse && state.currentCourse.info.content) || []
}

export const getCurrentCourseUid = state => {
  return (
    (state.currentCourse &&
      state.currentCourse.info &&
      state.currentCourse.info.uid) ||
    ''
  )
}

export const getPaidCourses = state => {
  const paidCourses =
    state.auth && state.auth.currentUser && state.auth.currentUser.paidCourses
  return paidCourses || []
}

export const getDetailedPaidCourses = state => {
  const allCourses = getCourses(state) || []
  const paid = getPaidCourses(state)
  const detailedPaid = allCourses.filter(c => {
    return paid.includes(c.uid)
  })
  return detailedPaid
}

export const getIsMember = state =>
  (state.auth && state.auth.currentUser && state.auth.currentUser.member) ||
  false

export const getIsOnEpisodePage = state =>
  (state.common && state.common.isOnEpisodePage) || false

export const getCurrentEpisodeUid = state =>
  (state.episode && state.episode.item && state.episode.item.uid) || ''

export const getCurrentEpisodeTitle = state => {
  const currentCourse = getCurrentCourse(state)
  const currentEpisodeUid = getCurrentEpisodeUid(state)

  return (
    (currentCourse.info &&
      currentCourse.info.content &&
      filterEpisodeFromCurrentCourse(
        currentCourse.info.content,
        currentEpisodeUid
      ).title) ||
    ''
  )
}

export const getCurrentCourseIntro = state => {
  const { currentCourse } = state
  const info = currentCourse.info
  return (
    (info && {
      writingToWho: info.writing_to_who,
      intro: info.intro,
      learningGoal: info.learning_goal,
      title: info.name
    }) ||
    {}
  )
}

export const getCurrentCoursePrice = state => {
  const { currentCourse } = state
  return currentCourse.info.price || 0
}

export const getCurrentCourseName = state => {
  const { currentCourse } = state
  return currentCourse.info.name || ''
}

export const getEpisodes = state => {
  const { currentCourse } = state
  const info = currentCourse.info
  const toc =
    (info.content &&
      info.content.reduce((list, el) => {
        return [...list, ...el.section]
      }, [])) ||
    []
  return toc
}

export const getCourseIntroVideoLink = state => {
  const currentCourse = getCurrentCourse(state)
  const { vlink, cover_video: coverVideo } = currentCourse.info
  const videoLink =
    (currentCourse.info &&
      currentCourse.info.vlink &&
      `${vlink}/${coverVideo ? coverVideo : 'index'}.mp4`) ||
    ''
  return videoLink
}

export const getEpisodeVideoLink = state => {
  const courseUid = getCurrentCourseUid(state)
  const episodeUid = getCurrentEpisodeUid(state)
  if (courseUid !== '' && episodeUid !== '') {
    return `${courseUid}/${episodeUid}.mp4`
  }
  return ''
}

export const getEpisodeMarkdown = state => {
  return state.episode.item.markdown || ''
}

// drawer
export const getIsDrawerOpen = state =>
  (state.common && state.common.isDrawerOpen) || false

export const getIsDrawerFirstLoad = state =>
  state.common && state.common.isDrawerFirstLoad
