import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCourse, signContract, checkContract} from '../redux/actions/contentAction'
import {getCourse} from '../redux/selectors/commonSelectors.js'
import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'

const AsyncCourse = Loadable({
  loader: () => import('../components/Course/Course'),
  loading: LoadingComponent,
  delay: 300,
})

class CourseContainer extends Component {
  componentWillMount() {
    // fetch the course-data from server
    let {courseName} = this.props.match.params
    this.props.fetchCourse({courseName})
  }

  render() {
    let {status, content: courseContent} = this.props.course

    switch (status) {
      case 'LOADING': {
        return <LoadingComponent />
      }
      case 'SUCCESS': {
        const couseUrl = `${courseContent.vlink}/${
          courseContent.cover_video ? courseContent.cover_video : 'index'
        }.mp4`
        // VideoJsOptions for this Course
        const CourseVideoJsOptions = {
          autoplay: false,
          controls: true,
          sources: [
            {
              src: couseUrl,
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
            courseOptions={courseContent}
            videoJsOptions={CourseVideoJsOptions}
            signContract={this.props.signContract}
            checkContract={this.props.checkContract}
          />
        )
      }
      case 'FAILURE': {
        return <div>信息加载失败</div>
      }
      default: {
        throw new Error('unexpected status ' + status)
      }
    }
  }
}

const mapStateToProps = state => ({
  course: getCourse(state),
})

export default connect(mapStateToProps, {fetchCourse, signContract, checkContract})(CourseContainer)
