import React from 'react'
import { Typography } from '@material-ui/core'

class CourseIntro extends React.Component {
  render() {
    const { intro, learningGoal, writingToWho } = this.props.courseIntro

    return (
      <div>
        <div>
          <Typography>一句话简介</Typography>
          {intro}
        </div>
        <div>
          <Typography>适合观众</Typography>
          {learningGoal}
        </div>
        <div>
          <Typography>'知识点</Typography>
          {writingToWho}
        </div>
      </div>
    )
  }
}

export default CourseIntro
