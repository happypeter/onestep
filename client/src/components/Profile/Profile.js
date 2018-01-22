import React, {Component} from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import CourseCard from '../common/CourseCard'
import defaultAvatar from '../../assets/avatarIcon.svg'
import isEmpty from 'lodash.isempty'

class Profile extends Component {
  componentDidMount() {
    const {profile} = this.props
    if (profile && isEmpty(profile.details)) {
      this.props.fetchProfile()
    }
  }

  render() {
    const {isFetching, details} = this.props.profile
    const {currentUser} = this.props.auth
    let pageContent
    if (isFetching) {
      pageContent = <ContentWrap>信息请求中...</ContentWrap>
    } else {
      let membershipList
      if (details.memberships && details.memberships.length) {
        membershipList = details.memberships.map((m, i) => {
          return (
            <div key={i}>已开通{m.duration}个月会员服务，开通日期{m.startDate}，截止日期{m.expireDate}</div>
          )
        })
      }
      pageContent = (
        <div>
          <AvatarHero>
            <AvatarWrap>
              <img src={defaultAvatar} alt="nickname" />
              <Nickname>{currentUser.username}</Nickname>
              {details.sum !== 0 ? <div>已在好奇猫为自己投资{details.sum}元</div> : <div>还没有在好奇猫为自己投资</div>}
            </AvatarWrap>
          </AvatarHero>
          <ContentWrap>
            <SubTitle>课程</SubTitle>
            {details.paidCourses && details.paidCourses.length ? (
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
              <MembershipMsg>开通会员</MembershipMsg>
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
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const AvatarHero = styled.div`
  background-color: #00bcd4;
`

const AvatarWrap = styled.div`
  background-color: #00bcd4;
  height: 200px;
  align-items: center;
  flex-grow: 0;
  img {
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 12px;
    display: block;
    width: 103px;
    height: 103px;
    border-radius: 50%;
    border: 1px solid white;
  }
  @media (min-width: 1024px) {
    width: 1024px;
    margin: 0 auto;
    height: 325px;
    img {
      margin-top: 48px;
      margin-bottom: 21px;
      width: 170px;
      height: 170px;
    }
  }
`

const Nickname = styled.span`
  font-size: 1em;
  color: #ffffff;
  @media (min-width: 1024px) {
    font-size: 2em;
  }
`

const ContentWrap = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
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
