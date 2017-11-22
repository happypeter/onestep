import React, { Component } from 'react'
import {
  Redirect,
  matchPath
} from 'react-router-dom'
import { connect } from 'react-redux'
import Episode from '../components/Episode/Episode'

class EpisodeContainer extends Component {
  render () {
    // 404: /path + whatever
    let { courseName, episodeName } = this.props.match.params
    const isPathExact = this.props.courses.filter(
      item => {
        if (item.title !== courseName) return
        let isExact = item.episode.filter(
          // return an Array(0)(404) or Array(1)
          episode => (
            episode === episodeName
          )
        )
        return (isExact.length !== 0)
      }
    )
    if (isPathExact.length === 0) {
      return <Redirect to={{ pathname: '/404' }} />
    }

    // 404: /path/whatever
    const match = matchPath(this.props.location.pathname, {
      path: this.props.match.path
    })
    if (!match.isExact) {
      return <Redirect to={{ pathname: '/404' }} />
    }

    return (
      <div>
        <Episode episodeName={episodeName} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses
})

export default connect(mapStateToProps)(EpisodeContainer)
