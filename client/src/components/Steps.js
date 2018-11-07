import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-static'
import {
  MAX_WIDTH,
  PRIMARY_TEXT_COLOR,
  DEFAULT_PRIMARY_COLOR
} from '../constants/GlobalStyle'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 1,
    maxWidth: MAX_WIDTH,
    margin: '0 auto',
    textAlign: 'center'
  },
  section: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  img: {
    display: 'block',
    width: '100%',
    maxWidth: 350,
    margin: '24px auto'
  },
  title: {
    fontSize: 18,
    paddingTop: 24
  },
  desc: {
    lineHeight: 2,
    color: PRIMARY_TEXT_COLOR
  },
  link: {
    textDecoration: 'underline',
    color: DEFAULT_PRIMARY_COLOR,
    fontWeight: 600
  }
})

class Steps extends Component {
  state = {
    course: '',
    price: ''
  }

  componentDidMount() {
    const qs = this.props.location.search.slice(1).split('&')
    const course = qs[0].split('=')[1]
    const price = qs[1].split('=')[1]
    this.setState({
      course: decodeURI(course),
      price
    })
  }

  render() {
    const { classes: s } = this.props
    return (
      <div className={s.root}>
        <div className={s.section}>
          <div className={s.title}>{this.state.course}</div>
          <img src="/weixin.jpeg" className={s.img} />
          <div className={s.desc}>
            <div>添加 happypeter 微信：happypeter1983</div>
            <div>通过微信支付，本课程价格 {this.state.price}元</div>
            <div>
              把您在本站
              <Link to="/signup" className={s.link}>
                注册
              </Link>
              使用的手机号发送给 happypeter 就行了
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Steps)
