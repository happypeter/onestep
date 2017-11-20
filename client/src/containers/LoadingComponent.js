import React from 'react'

const LoadingComponent = (props) => {
  if (props.error) {
    return <div>Error!</div>
  } else if (props.pastDelay) {
    return <div>Loading...</div>
  } else {
    return null
  }
}

export default LoadingComponent
