import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCourse, signContract, checkContract} from '../redux/actions/contentAction'
import {getCourse, getProfile} from '../redux/selectors/commonSelectors.js'
import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'

const AsyncCourse = Loadable({
  loader: () => import('../components/Course/Course'),
  loading: LoadingComponent,
  delay: 300,
})

class CourseContainer extends Component {
  componentWillMount() {
    let {courseName} = this.props.match.params
    this.props.fetchCourse({courseName})
  }

  render() {
    let {isFetching, item: course} = this.props.course
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
          type: 'video/mp4',
        },
      ],
      fluid: 'true', // put the player in the VideoPlayerWrap box
      playbackRates: [0.75, 1, 1.5, 2],
      controlBar: {
        volumePanel: {
          inline: false, // vertical VolumeControl
        },
      },
      // Using A Plugin
      plugins: {
        setStateandFocusPlugin: true,
      },
    }

    return (
      <AsyncCourse
        courseOptions={course}
        videoJsOptions={CourseVideoJsOptions}
        signContract={this.props.signContract}
        checkContract={this.props.checkContract}
        profile={this.props.profile}
      />
    )
  }
}

const mapStateToProps = state => ({
  course: getCourse(state),
  profile: getProfile(state)
})

export default connect(mapStateToProps, {fetchCourse, signContract, checkContract})(CourseContainer)
