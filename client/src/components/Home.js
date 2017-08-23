import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import CourseList from './CourseList'
import '../style/home.css'

export default () => (
  <div className='home'>
    <Link to='/Login' className='button'>微信登录</Link>
    <CourseList />
  </div>
)
