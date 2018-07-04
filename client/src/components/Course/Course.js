import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CourseIntro from '../../containers/CourseIntroContainer'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'
import EpisodeList from '../../containers/EpisodeListContainer'
import Buy from '../../containers/BuyContainer'

class Course extends Component {
  componentDidMount() {
    const { courseUid } = this.props.match.params
    console.log('course.js.......', courseUid)
    this.props.fetchCurrentCourse(courseUid)
  }

  render() {
    const { videoJsOptions } = this.props
    return (
      <div>
        <VideoPlayer {...videoJsOptions} />
        <CourseIntro />
        <EpisodeList />
        <Buy />
      </div>
    )
  }
}

Course.propTypes = {
  fetchCurrentCourse: PropTypes.func.isRequired
}

export default Course
