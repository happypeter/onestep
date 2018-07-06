const filterEpisode = (section, uid) => {
  return section.find(item => item.uid === uid)
}
export const filterEpisodeFromCurrentCourse = (content, epUid) => {
  let episode = {}
  for (let i = 0; i < content.length; i++) {
    const section = content[i].section
    const matched = filterEpisode(section, epUid)
    if (matched) {
      episode = { ...matched }
      break
    }
  }
  return episode
}
