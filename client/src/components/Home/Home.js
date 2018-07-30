import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-static'
import PropTypes from 'prop-types'
import history from '../../utils/routerUtils'

class Home extends React.Component {
  handleClick = path => {
    this.props.goto(path)
  }

  render() {
    return (
      <div>
        <Button variant="raised" onClick={() => history.push('/signup')}>
          Login
        </Button>
        <Link to="/login">login</Link>
      </div>
    )
  }
}

Home.propTypes = {
  goto: PropTypes.func.isRequired
}
export default Home
