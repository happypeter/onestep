import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Link,
  Redirect,
  matchPath
} from 'react-router-dom'
// import Course from '../components/Course/Course'
import { fetchCourse } from '../redux/actions/contentAction'

import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'

const AsyncCourse = Loadable({
  loader: () => import('../components/Course/Course'),
  loading: LoadingComponent,
  delay: 300
})


class CourseContainer extends Component {

  componentWillMount () {
    let { courseName } = this.props.match.params
    // fetch the course data form server
    this.props.fetchCourse({ courseName })
  }

  render () {
    // console.log(this.props);
    // 404 Redirect
    let { courseName } = this.props.match.params
    // console.log(courseName);

    // let { catalogue } = this.props.courses
    // console.log(catalogue);
    // let thisCourse = this.props.courses.find(
    // let thisCourse = catalogue.find(
    //   item => (
    //     item.link.substr(1) === courseName
    //   )
    // )
    // if (!thisCourse) {
    //   return <Redirect to={{ pathname: '/404' }} />
    // }

    const match = matchPath(this.props.location.pathname, {
      path: this.props.match.path
    })
    // console.log(this.props);
    if (!match.isExact) {
      return <Redirect to={{ pathname: '/404' }} />
    }

    let { status, content: courseContent } = this.props.course

    switch (status) {
      case 'LOADING': {
        return (
          // <div>
            // <div>信息请求中...</div>
          // </div>
          <LoadingComponent />
        )
      }
      case 'SUCCESS': {
        // VideoJsOptions for this Course
        const CourseVideoJsOptions = {
          autoplay: false,
          controls: true,
          sources: [{
            src: `${courseContent.vlink}/${courseContent.cover_video}.mp4`,
            type: 'video/mp4'
          }],
          poster: 'http://videojs.com/img/logo.png',
          fluid: 'true', // put the player in the VideoPlayerWrap box
          playbackRates: [0.75, 1, 1.5, 2],
          controlBar: {
            volumePanel: {
              inline: false // vertical VolumeControl
            }
          },
          // Using A Plugin
          plugins: {
            setStateandFocusPlugin: true
          }
        }

        return (
          <div>
            <AsyncCourse
              courseOptions={courseContent}
              videoJsOptions={CourseVideoJsOptions}
            />
          </div>
        )
      }
      case 'FAILURE': {
        return (
          <div>
            <div>信息加载失败</div>
          </div>
        )
      }
      default: {
        throw new Error('unexpected status ' + status)
      }
    }
  }
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { fetchCourse })(CourseContainer)
