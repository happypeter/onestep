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

class BuyMembership extends Component {
  state = {
    codeUrl: '',
    contractId: '',
    showModal: false,
    price: null
  }

  componentWillMount = () => {
    this.timerId = null
  }

  componentWillUnmount = () => {
    clearInterval(this.timerId)
  }

  timer = () => {
    clearInterval(this.timerId)
    const { contractId } = this.state
    this.timerId = setInterval(() => {
      this.props.checkContract(contractId, 'member').then(status => {
        if (status === '已支付') {
          this.closeModal()
        }
      })
    }, 5000)
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    clearInterval(this.timerId)
    this.setState({ showModal: false })
  }

  pay = price => {
    this.openModal()
    const data = {}
    data.total = price
    this.setState({ codeUrl: '', price: '' })
    this.props
      .signContract(data)
      .then(result => {
        this.setState(
          {
            codeUrl: result.codeUrl,
            contractId: result.contractId,
            price
          },
          () => {
            this.timer()
          }
        )
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { price, codeUrl } = this.state
    return (
      <div>
        <MembershipWrap>
          <Membership>
            <Date>一个月</Date>
            <Price>42元</Price>
            <RaisedButtonWrap raised onClick={this.pay.bind(this, 42)}>
              购买
            </RaisedButtonWrap>
          </Membership>
          <Membership>
            <Date>三个月</Date>
            <Price>90元</Price>
            <RaisedButtonWrap raised onClick={this.pay.bind(this, 90)}>
              购买
            </RaisedButtonWrap>
          </Membership>
        </MembershipWrap>
        <Modal
          isOpen={this.state.showModal}
          style={customStyles}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
        >
          <Inner>
            <Header>
              <Title>开通会员</Title>
              <Img src={closeImg} onClick={this.closeModal} alt="close" />
            </Header>
            {codeUrl ? (
              <div>
                <QRCode value={codeUrl} size={220} />
                <Desc>微信扫描二维码完成支付</Desc>
                <Fee>{price}元</Fee>
              </div>
            ) : (
              <CodeImg />
            )}
          </Inner>
        </Modal>
      </div>
    )
  }
}

export default BuyMembership

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

const MembershipWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 32px auto 56px;
  width: 100%;
  max-width: 630px;
`

const Membership = styled.div`
  width: 200px;
  margin: 16px;
  padding: 16px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
`

const Date = styled.div`
  font-size: 16px;
  font-weight: 600;
`

const Price = styled.div`
  padding: 24px;
  color: #212121;
  font-size: 32px;
`

const RaisedButtonWrap = styled(Button)`
  && {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    background-color: #ff4081;
  }
`

const CodeImg = styled.div`
  width: 220px;
  height: 220px;
`
