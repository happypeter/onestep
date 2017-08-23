import React, { Component } from 'react'

class CourseList extends Component {
  state = {
    courses: [
    {
      'id': '0',
      'title': 'Course0',
      'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/redux-hello-v2.png',
      'msg': 'peter - 2days ago'
    },
    {
      'id': '1',
      'title': 'Course1',
      'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/aa-journey.png',
      'msg': 'peter - 12days ago'
    },
    {
      'id': '2',
      'title': 'Course2',
      'post': 'http://haoqicat-1253322599.costj.myqcloud.com/posters/redux-hello-v2.png',
      'msg': 'peter - 22days ago'
    }
]
  }

  render(){
    let courses = this.state.courses.map((item, i) => (
      <div key={i} className='course'>
        <img src={`${item.post}`} />
        <h2>{item.title}</h2>
        <p>{item.msg}</p>
      </div>
    ))

    return(
      <div className="course-list">
        {courses}
      </div>
    )
  }
}

export default CourseList
