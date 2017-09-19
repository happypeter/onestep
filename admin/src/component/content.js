import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import moment from 'moment'
import { Card } from 'antd';
// import '../../styles/item-details.css'


class Course extends Component {
  state = {
    course: {},
    test: 'hellopp'
  }

  componentWillMount() {
    axios.post(`${config.api}/getObject`, {Key:'探险家.jpg'})
      .then((res) => {
        // this.setState({course: res.data.course})
        console.log(res);
      })
  }

  render() {
    let course = this.state.course

    return (
      <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
        <div className="custom-image">
          <img alt="example" style={{ display: 'block', width: "100%" }} src="https://testbucket-1252891333.file.myqcloud.com/探险家.jpg" />
        </div>
        <div style={{ padding: '10px 16px' }}>
          <h3>Europe Street beat</h3>
          <p style={{ color: '#999' }}>www.instagram.com</p>
        </div>
      </Card>
    )
  }
}

export default Course
