import React, {Component} from 'react'
import TopHeader from '../Header/TopHeader'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import NewAccount from './NewAccount'
import ExistedAccount from './ExistedAccount'

class WeChatCallBack extends Component {
  state = {
    existed: false,
  }

  componentWillMount = () => {
    const {oauthWeChat, history} = this.props
    const query = window.location.href.split('?')[1]
    if (query && query.split('&')) {
      const code = query.split('&')[0].slice(5)
      if (code) {
        if (!/MicroMessenger/i.test(window.navigator.userAgent)) {
          oauthWeChat({code, userAgent: 'PC'}, history)
        } else {
          oauthWeChat({code, userAgent: 'MicroMessenger'}, history)
        }
      } else {
        history.go(-2)
      }
    } else {
      history.go(-2)
    }
  }

  handleClick = () => {
    this.setState({
      existed: !this.state.existed,
    })
  }

  render() {
    const {user, oauthBinding, history} = this.props
    if (!Object.keys(user).length) return null
    return (
      <Wrap>
        <TopHeader />
        <Content>
          {user && !this.state.existed ? (
            <NewAccount
              oauthBinding={oauthBinding}
              history={history}
              switchTab={this.handleClick}
              user={user}
            />
          ) : (
            <ExistedAccount
              oauthBinding={oauthBinding}
              history={history}
              switchTab={this.handleClick}
              user={user}
            />
          )}
        </Content>
        <Footer />
      </Wrap>
    )
  }
}

export default WeChatCallBack

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Content = styled.div`
  flex-grow: 1;
`
