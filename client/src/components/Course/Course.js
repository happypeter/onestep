import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CourseIntro from '../../containers/CourseIntroContainer'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'
import EpisodeList from '../../containers/EpisodeListContainer'
import Buy from '../../containers/BuyContainer'
import { videoJsOptions } from '../../lib/playerConfig'

class Course extends Component {
  componentDidMount() {
    const { courseUid } = this.props.match.params
    this.props.fetchCurrentCourse(courseUid)
  }

  render() {
    const { videoLink } = this.props
    return (
      <div>
        {videoLink && <VideoPlayer {...videoJsOptions(videoLink)} />}
        <CourseIntro />
        <EpisodeList />
        <Buy />
      </div>
    )
  }
}

Course.propTypes = {
  fetchCurrentCourse: PropTypes.func.isRequired,
  videoLink: PropTypes.string.isRequired
}

export default Course
