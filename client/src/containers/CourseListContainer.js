import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCatalogue} from '../redux/actions/contentAction'
import {getCourses} from '../redux/selectors/commonSelectors.js'
import LoadingComponent from '../components/common/Loading'
import Loadable from 'react-loadable'

const AsyncCourseList = Loadable({
  loader: () => import('../components/CourseList/CourseList'),
  loading: LoadingComponent,
  delay: 300,
})

class CourseListContainer extends Component {
  componentDidMount() {
    this.props.fetchCatalogue()
  }

  render() {
    let {status, catalogue} = this.props.courses
    return (
      <div>
        <AsyncCourseList status={status} courses={catalogue} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  courses: getCourses(state),
})

export default connect(mapStateToProps, {fetchCatalogue})(CourseListContainer)
