import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import CourseCard from '../common/CourseCard'
import defaultAvatar from '../../assets/avatarIcon.svg'
import isEmpty from 'lodash.isempty'
import BuyMembership from './BuyMembership'

class Profile extends Component {
  componentWillMount() {
    this.props.fetchProfile()
  }

  render() {
    const { isFetching, details } = this.props.profile
    const { currentUser } = this.props.auth
    const { signContract, checkContract } = this.props
    let pageContent
    if (isFetching) {
      pageContent = <ContentWrap>信息请求中...</ContentWrap>
    } else {
      let membershipList
      if (!isEmpty(details.memberships)) {
        membershipList = details.memberships.map((m, i) => {
          return (
            <div key={i}>
              已购买{m.duration}个月会员服务，购买日期 {m.startDate}，截止日期{' '}
              {m.expireDate}
            </div>
          )
        })
      }
      let avatar = defaultAvatar
      if (currentUser && !isEmpty(currentUser.bindings)) {
        const weChat = currentUser.bindings.find(item => item.via === 'wechat')
        avatar = weChat.headImgUrl
      }
      pageContent = (
        <div>
          <AvatarHero>
            <AvatarWrap>
              <img src={avatar} alt="avatar" />
              <Nickname>{currentUser.username}</Nickname>
              {details && details.sum > 0 ? (
                <div>已在好奇猫为自己投资{details.sum.toFixed(2)}元</div>
              ) : (
                <div>还没有在好奇猫为自己投资</div>
              )}
            </AvatarWrap>
          </AvatarHero>
          <ContentWrap>
            <SubTitle>课程</SubTitle>
            {!isEmpty(details.paidCourses) ? (
              <CourseListWrap>
                {details.paidCourses.map((item, i) => (
                  <CourseCard
                    link={item.link}
                    key={i}
                    publishedAt={item.publishedAt}
                    cover={item.cover}
                    title={item.title}
                  />
                ))}
              </CourseListWrap>
            ) : (
              <div>还没有购买过课程</div>
            )}
            <SubTitle>会员</SubTitle>

            {details.isMember ? (
              <MembershipMsg>{membershipList}</MembershipMsg>
            ) : (
              <BuyMembership
                signContract={signContract}
                checkContract={checkContract}
              />
            )}
          </ContentWrap>
        </div>
      )
    }

    return (
      <Wrap>
        <TopHeader />
        {pageContent}
        <Footer />
      </Wrap>
    )
  }
}

export default Profile

const Wrap = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`

const AvatarHero = styled.div`
  background-color: #00bcd4;
`

const AvatarWrap = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid white;
  }
  @media (min-width: 1024px) {
    height: 300px;
    img {
      width: 120px;
      height: 120px;
    }
  }
`

const Nickname = styled.div`
  padding: 16px 0;
  font-size: 20px;
  color: #ffffff;
`

const ContentWrap = styled.div`
  flex-grow: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    box-sizing: border-box;
    width: 1024px;
    margin: 0 auto;
  }
`

const SubTitle = styled.div`
  color: #212121;
  width: 102px;
  margin: 0px auto;
  margin-top: 43px;
  margin-bottom: 23px;
  text-align: center;
  font-size: 2em;
  border-bottom: 7px solid #00bcd4;
  @media (min-width: 1024px) {
    margin-top: 87px;
    margin-bottom: 47px;
  }
`

const MembershipMsg = styled.span`
  font-size: 1em;
  margin: 23px auto;
  @media (min-width: 1024px) {
    margin: 47px auto;
    padding-bottom: 40px;
  }
`

const CourseListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px auto;
  @media (min-width: 1024px) {
    padding: 1em 4em;
  }
`
