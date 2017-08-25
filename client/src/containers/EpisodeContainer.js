import React, { Component } from 'react'
import Episode from '../components/Episode/Episode'

class EpisodeContainer extends Component {
  render () {
    let { episodeName } = this.props.computedMatch.params

    return (
      <div >
        <Episode episodeName={episodeName} />
      </div>
    )
  }
}

export default EpisodeContainer
