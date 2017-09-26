import React, { Component } from 'react'
import LoginForm from '../LoginForm/LoginForm'
import styled from 'styled-components'

const FormWrap = styled.div`
  border: 1px solid #ddd;
  margin: 100px auto;
  padding: 10px;
  width: 350px;
`

class Home extends Component {
  render () {
    return (
      <div className='home'>
        <FormWrap>
          <LoginForm />
        </FormWrap>
      </div>
    )
  }
}

export default Home
