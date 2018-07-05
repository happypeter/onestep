import React, { Component } from 'react'
import styled from 'styled-components'
import CourseCard from '../common/CourseCard'
import MemberShip from './MemberShip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 3
  },
  sectionTitle: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  }
})

class Profile extends Component {
  componentDidMount() {
    this.props.fetchCoursesIfNeeded()
  }

  render() {
    const { courses, anyCourse, isMember, goto, classes: s } = this.props
    const pageContent = (
      <div className={s.root}>
        <ContentWrap>
          <div className={s.sectionTitle}>
            <Typography variant="headline">购买的课程</Typography>
          </div>
          {anyCourse ? (
            <CourseListWrap>
              {courses.map(course => (
                <CourseCard
                  key={course.uid}
                  uid={course.uid}
                  title={course.title}
                  goto={goto}
                />
              ))}
            </CourseListWrap>
          ) : (
            <div>还没有购买过课程</div>
          )}

          <div className={s.sectionTitle}>
            <Typography variant="headline">会员服务</Typography>
          </div>
          <MemberShip isMember={isMember} />
        </ContentWrap>
      </div>
    )

    return <Wrap>{pageContent}</Wrap>
  }
}

export default withStyles(styles)(Profile)

const Wrap = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`

const ContentWrap = styled.div`
  flex-grow: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    box-sizing: border-box;
    width: 1024px;
    margin: 0 auto;
  }
`

const CourseListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px auto;
  @media (min-width: 1024px) {
    padding: 1em 4em;
  }
`
