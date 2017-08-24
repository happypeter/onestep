import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../style/course.css'

class Course extends Component {
  render(){
    let { courseName } = this.props.match.params
    console.log(courseName);
    let thisCourse = this.props.courses.find(
      item => (
        item.title === courseName
      )
    )
    console.log(thisCourse);
    let episode = thisCourse.episode.map((item, i) => (
      <Link to={`/${courseName}/${item}`} key={i} className='episode'>
        {item}
      </Link>
    ))

    return(
      <div className="episode-list">
        <img src={`${thisCourse.post}`} alt='poster' className='poster' />
        <h2>章节列表</h2>
        { episode }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  courses: state
})

export default connect(mapStateToProps)(Course)
