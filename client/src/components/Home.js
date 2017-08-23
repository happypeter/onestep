import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import CourseList from './CourseList'

export default () => (
  <div className='home'>
    <Link to='/Login'>微信登录</Link>
    <CourseList />
  </div>
)
