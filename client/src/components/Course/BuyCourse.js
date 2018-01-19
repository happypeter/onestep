import React, { Component } from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode.react'
import Button from 'material-ui/Button'
import Modal from 'react-modal'
import closeImg from '../../assets/close.svg'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 30, 30, 0.6)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)'
  }
}

class BuyCourse extends Component {
  state = {
    codeUrl: '',
    contractId: '',
    showModal: false,
  }

  componentWillMount = () => {
    this.timerId = null
  }

  componentWillUnmount = () => {
    clearInterval(this.timerId)
  }

  timer = () => {
    clearInterval(this.timerId)
    const {contractId} = this.state
    this.timerId = setInterval(() => {
      this.props.checkContract(contractId).then(status => {
        if (status === '已支付') {
          this.closeModal()
        }
      })
    }, 5000)
  }

  openModal = () => {
    this.setState({showModal: true});
  }

  closeModal = () => {
    clearInterval(this.timerId)
    this.setState({showModal: false});
  }

  pay = () => {
    this.openModal()
    const {name, courseId, price} = this.props
    const data = {}
    data.name = name
    data.courseId = courseId
    data.total = price

    this.props.signContract(data)
      .then(result => {
        this.setState({
          codeUrl: result.codeUrl,
          contractId: result.contractId,
        }, () => {this.timer()})
      })
      .catch(error => {console.log(error)})
  }

  render() {
    const {price} = this.props
    return (
      <div>
        <MsgBigCard>
          <Price>{price}元</Price>
          <RaisedButtonWrap raised onClick={this.pay}>
            购买本课程
          </RaisedButtonWrap>
        </MsgBigCard>
        <Modal
          isOpen={this.state.showModal}
          style={customStyles}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          ariaHideApp={false}>
            <Inner>
              <Header>
                <Title>购买课程</Title>
                <Img src={closeImg} onClick={this.closeModal} alt='close' />
              </Header>
              <QRCode value={this.state.codeUrl} size={220} />
              <Desc>微信扫描二维码完成支付</Desc>
              <Fee>{price}元</Fee>
            </Inner>
        </Modal>
      </div>
    )
  }
}

export default BuyCourse

const Inner = styled.div`
  width: 300px;
  text-align: center;
  padding-bottom: 16px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`

const Img = styled.img`
  cursor: pointer;
`

const Title = styled.div`
  color: #212121;
  font-weight: 600;
  font-size: 16px;
`

const Desc = styled.div`
  margin-top: 24px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #999;
`

const Fee = styled.div`
  font-size: 18px;
  color: #ff1744;
`

const MsgBigCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 2em 2em 2em;
  padding-bottom: 1em;
  background-color: #ffffff;
  p {
    font-weight: 300;
    font-size: 0.875em;
    color: #212121;
  }
  @media (min-width: 1024px) {
    width: 247px;
    margin: 138px auto 131px auto;
    p {
      font-weight: 400;
    }
  }
`

const RaisedButtonWrap = styled(Button)`
  && {
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0;
    margin: 1em 16%;
    background-color: #00b4d0;
  }
`

const Price = styled.div`
  font-size: 30px;
  margin: 0 30px;
`
