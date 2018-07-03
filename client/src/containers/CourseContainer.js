import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchCourse,
  signContract,
  checkContract
} from '../redux/actions/contentAction'
import {
  getCurrentCourse,
  getProfile,
  getPaidCourses,
  getIsMember
} from '../redux/selectors/commonSelectors'
import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'

const AsyncCourse = Loadable({
  loader: () => import('../components/Course/Course'),
  loading: LoadingComponent,
  delay: 300
})

class CourseContainer extends Component {
  componentWillMount() {
    let { courseName } = this.props.match.params
    this.props.fetchCourse(courseName)
  }

  render() {
    let { isFetching, info: course } = this.props.currentCourse
    if (isFetching) return <LoadingComponent />
    const courseUrl = `${course.vlink}/${
      course.cover_video ? course.cover_video : 'index'
    }.mp4`

    const CourseVideoJsOptions = {
      autoplay: false,
      controls: true,
      sources: [
        {
          src: courseUrl,
          type: 'video/mp4'
        }
      ],
      fluid: 'true', // put the player in the VideoPlayerWrap box
      playbackRates: [0.75, 1, 1.5, 2],
      controlBar: {
        volumePanel: {
          inline: false // vertical VolumeControl
        }
      }
    }

    return <AsyncCourse videoJsOptions={CourseVideoJsOptions} {...this.props} />
  }
}

const mapStateToProps = state => ({
  currentCourse: getCurrentCourse(state),
  profile: getProfile(state),
  isMember: getIsMember(state),
  paidCourses: getPaidCourses(state)
})

export default connect(
  mapStateToProps,
  {
    fetchCourse,
    signContract,
    checkContract
  }
)(CourseContainer)
