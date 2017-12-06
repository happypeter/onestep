import React, { Component } from 'react'
import { connect } from 'react-redux'
// import CourseList from '../components/CourseList/CourseList'
import { fetchCatalogue } from '../redux/actions/contentAction'
import LoadingComponent from '../components/common/Loading'
import Loadable from 'react-loadable'

const AsyncCourseList = Loadable({
  loader: () => import('../components/CourseList/CourseList'),
  loading: LoadingComponent,
  delay: 300
})

class CourseListContainer extends Component {

  componentDidMount () {
    this.props.fetchCatalogue()
  }

  render () {
    // console.log(this.props);
    let { status, catalogue } = this.props.courses
    return (
      <div>
        <AsyncCourseList
          status={status}
          courses={catalogue}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses
})

export default connect(mapStateToProps, { fetchCatalogue })(CourseListContainer)
